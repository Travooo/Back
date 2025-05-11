//*VERIFICAR UTILIZAÇÃO DE MODELO ANEXO AQUI*/

const path = require('path');
const supabase = require("../config/db");
const { validateNumber } = require("../validators/validators");

class AnexoService {
  async validarEntidade(entidade_tipo, entidade_id) {
    let tabela
    if (entidade_tipo === 'usuario') {
      tabela = 'usuarios'
    } else if (entidade_tipo === 'servico') {
      tabela = 'servicos'
    } else {
      throw new Error('Tipo de entidade inválido.')
    }
    const { data, error } = await supabase
      .from(tabela)
      .select('id')
      .eq('id', validateNumber(entidade_id))
      .single()
    if (error || !data) {
      throw new Error(`Entidade não encontrada na tabela ${tabela}.`)
    }
    return true
  }

  static async upload(file, entidade_tipo, entidade_id, folder) {
    if (!file || !file.buffer || !entidade_tipo || !entidade_referencia || !folder) {
      throw new Error('Parâmetros obrigatórios não recebidos.');
    }
    await this.validarEntidade(entidade_tipo, entidade_id)

    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const safeName = `${name}-${Date.now()}${ext}`;
    const filePath = `${folder}/${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
    });
    if (uploadError) {
      throw new Error(`Erro ao enviar para o storage: ${uploadError.message}`);
    }

    const { publicUrl } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);
    const { data, error: anexoError } = await supabase
      .from("anexos")
      .insert([
        {
          nome_arquivo: file.originalname,
          mimetype: file.mimetype,
          tamanho: file.size,
          entidade_tipo,
          entidade_id,
          url_publica: publicUrl,
          path_armazenado: filePath
        }])
    if (anexoError) {
      await supabase.storage.from('uploads').remove([filePath]);
      throw new Error(`Erro ao enviar para a tabela: ${error.message}`);
    }
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("anexos")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(`Anexo não encontrado: ${error.message}`);

    const publicUrl = supabase.storage
      .from('uploads')
      .getPublicUrl(data.path_armazenado).publicUrl;
    return {
      ...data,
      url_publica: publicUrl,
    };
  }

  static async getAll() {
    const { data, error } = await supabase.from("anexos").select("*");
    if (error) throw new Error("Erro ao listar anexos.");

    const anexosComLinks = data.map(anexo => {
      const publicUrl = supabase.storage
        .from('uploads')
        .getPublicUrl(anexo.path_armazenado).publicUrl;
      return {
        ...anexo,
        url_publica: publicUrl, 
      };
    });

    return anexosComLinks;
  }

  static async delete(anexoId) {
    const { data, error: findError } = await supabase
    .from("anexos")
    .select("path")
    .eq("id", id)
    .single();
    if (findError) {
      throw new Error("Erro ao encontrar anexo para exclusão.");
    }

    const { error: deleteFileError } = await supabase
      .storage
      .from('uploads')
      .remove([data.path]);
    if (deleteFileError) {
      throw new Error("Erro ao excluir arquivo do storage.");
    }

    const { error: deleteAnexoError } = await supabase
      .from("anexos")
      .delete()
      .eq("id", anexoId);
    if (deleteAnexoError) {
      throw new Error("Erro ao deletar anexo.");
    }

    return { message: "Anexo e arquivo deletados com sucesso." };
  }
}

module.exports = AnexoService;
