const supabase = require('../config/db');


class AnexoService {
  static async upload(file, anexo) {
    const { error: uploadError } = await supabase.storage
      .from('travo')
      .upload(anexo.path, file.buffer, {
        contentType: file.mimetype,
        upsert: false
    });

    if (uploadError) throw new Error(`Erro ao enviar para o storage: ${uploadError.message}`);

    const { data: { publicUrl }, error: urlError } = supabase.storage.from('travo').getPublicUrl(anexo.path);

    if (urlError) {
      await supabase.storage.from('travo').remove([anexo.path]);
      throw new Error(`Erro ao gerar URL pública: ${urlError.message}`);
    }

    const { data, error: anexoError } = await supabase
      .from('anexos')
      .insert([{ ...anexo, url_publica: publicUrl }])
      .select()
      .single();

    if (anexoError) {
      await supabase.storage.from('travo').remove([file.path]);
      throw new Error(`Erro ao enviar para a tabela: ${anexoError.message}`);
    }

    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('anexos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Anexo não encontrado: ${error.message}`);

    return data;
  }

  static async getGaleria(entidade_id, path) {
    const { data, error } = await supabase
      .from('anexos')
      .select('*')
      .eq('entidade_id', entidade_id)
      .like('path', `${path}%`);

    if (error) throw new Error(`Erro ao buscar galeria: ${error.message}`);

    return data;
  }

  static async getProfilePic(entidade_id, path) {
    const { data, error } = await supabase
      .from('anexos')
      .select('*')
      .eq('entidade_id', entidade_id)
      .like('path', `${path }%`)
      .single();

    if (error) throw new Error(`Erro ao buscar foto de perfil: ${error.message}`);

    return data;
  }


  static async deleteByPath(path) {
    const { error: storageError } = await supabase
    .from('travo')
    .remove([path])

    if (storageError) throw new Error(`Erro ao remover arquivo do storage: ${storageError.message}`);
    
    const { data, error: dbError } = await supabase
    .from('anexos')
    .delete()
    .eq('path', path)
    .select()

    if (dbError) throw new Error(`Erro ao remover registro do banco: ${dbError.message}`);

    return data;
  }

  static async deleteById(anexo_id) {
    const anexo = await this.getById(anexo_id);

    const { error: storageError } = await supabase.storage
      .from('travo')
      .remove([anexo.path])

    if (storageError) throw new Error(`Erro ao remover arquivo do storage: ${storageError.message}`);

    const { data, error: dbError } = await supabase
      .from('anexos')
      .delete()
      .eq('id', anexo_id)
      .select()
      .single();

    if (dbError) throw new Error(`Erro ao remover anexo do banco: ${dbError.message}`);
    
    return data;
  }
}

module.exports = AnexoService;
