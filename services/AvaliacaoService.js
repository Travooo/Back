const Avaliacao = require("../model/Avaliacao");
const UsuarioService = require("./usuario_service");
const ServicoService = require("./ServicoService");
const supabase = require("../config/db");
const { validateNumber, cleanObject } = require("../validators/validators");

class AvaliacaoService {
  static async create(avaliacao) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!avaliacao || typeof avaliacao !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = Avaliacao.validateBySchema(avaliacao);
    // Verifica se usuário com 'usuario_id' existe
    const usuario = await UsuarioService.getUsuarioById(validated.usuario_id);
    if (!usuario) throw new Error("Usuário não encontrado.");
    // Verifica se serviço com 'servico_id' existe
    const servico = await ServicoService.getById(validated.servico_id);
    if (!servico) throw new Error("Serviço não encontrado.");
    // Insere no supabase
    const { data, error } = await supabase
      .from("avaliacoes")
      .insert(validated)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("avaliacoes")
      .select("*")
      .eq("id", validateNumber(id, "avaliacao_id"))
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("avaliacoes").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    const validId = validateNumber(id, "avaliacao_id");
    // Verifica se o registro existe antes de atualizar
    if (!(await this.getById(validId))) {
      throw new Error("Avaliação não encontrada.");
    }
    // Valida os dados conforme schema
    const camposValidos = cleanObject(updates);
    const validados = Avaliacao.validateBySchema(camposValidos);
    // Verifica se 'usuario_id' foi enviado e se esse usuário existe
    if ("usuario_id" in validados) {
      const usuario = await UsuarioService.getUsuarioById(validados.usuario_id);
      if (!usuario) throw new Error("Usuário não encontrado para atualização.");
    }
    // Verifica se 'servico_id' foi enviado e se esse estabelecimento existe
    if ("servico_id" in validados) {
      const servico = await ServicoService.getById(validados.servico_id);
      if (!servico) throw new Error("Serviço não encontrado para atualização.");
    }
    // Se usuario_id, servico_id e data_visita foram enviados, validar duplicidade
    if (validados.usuario_id && validados.servico_id && validados.data_visita) {
      const { data: existente, error: errorExistente } = await supabase
        .from("avaliacoes")
        .select("id")
        .eq("usuario_id", validados.usuario_id)
        .eq("servico_id", validados.servico_id)
        .eq("data_comentario", validados.data_comentario)
        .neq("id", validId) // <- Exclui o próprio registro
        .maybeSingle();
      if (errorExistente) throw errorExistente;
      if (existente)
        throw new Error(
          "Já existe um registro com este usuário, serviço e data."
        );
    }
    // Inserção no banco
    const { data, error } = await supabase
      .from("avaliacoes")
      .update(validados)
      .eq("id", validId)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async delete(id) {
    // Verifica se o registro existe antes de atualizar
    const avaliacao = await AvaliacaoService.getById(
      validateNumber(id, "avaliacao_id")
    );
    if (!avaliacao) {
      throw new Error("Avaliação não encontrada para remoção.");
    }
    const { data, error } = await supabase
      .from("avaliacoes")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = AvaliacaoService;
