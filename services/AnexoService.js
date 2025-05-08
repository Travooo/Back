const supabase = require("../config/db");
const UploadService = require("./UploadService");
const { validateNumber, cleanObject } = require("../validators/validators");

class AnexoService {
  static async create({ file, body }) {
    const { estabelecimento_id, usuario_id, tipo = "geral", detalhes } = body;

    const uploader = new UploadService();
    const folder = `estabelecimentos/${estabelecimento_id}`;

    const { fileName, path, publicUrl } = await uploader.upload(file, folder);

    const { data, error } = await supabase
      .from("anexo")
      .insert([
        {
          estabelecimento_id,
          usuario_id,
          tipo,
          detalhes,
          caminho: path,
          nome_arquivo: fileName,
          url_publica: publicUrl,
          horario: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error)
      throw new Error(`Erro ao salvar anexo no banco: ${error.message}`);

    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("anexo")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Anexo não encontrado: ${error.message}`);
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("anexo").select("*");
    if (error) throw new Error("Erro ao listar anexos.");
    return data;
  }

  static async update(id, updateData) {
    const { data, error } = await supabase
      .from("anexo")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Erro ao atualizar anexo.");
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from("anexo").delete().eq("id", id);
    if (error) throw new Error("Erro ao deletar anexo.");
  }
}

module.exports = AnexoService;
