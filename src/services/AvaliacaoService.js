const Avaliacao = require("../models/Avaliacao");
const UsuarioService = require("../services/UsuarioService");
const EstabelecimentoService = require("../services/EstabelecimentoService");
const supabase = require("../config/supabaseClient");
const { validateNumber, cleanObject } = require("../utils/validators");

class AvaliacaoService {
  static async create(avaliacao) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!avaliacao || typeof avaliacao !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = Avaliacao.validateBySchema(avaliacao);
    // Verifica se o usuário com 'usuario_id' existe
    const usuarioExiste = await UsuarioService.getById(validated.usuario_id);
    if (!usuarioExiste) throw new Error("Usuário não encontrado.");
    // Verifica se o estabelecimento com 'estabelecimento_id' existe
    const estabelecimentoExiste = await EstabelecimentoService.getById(
      validated.estabelecimento_id
    );
    if (!estabelecimentoExiste) throw new Error("Usuário não encontrado.");
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
    // Verifica se o registro existe antes de atualizar
    const validId = validateNumber(id, "avaliacao_id");
    if (!(await this.getById(validId))) {
      throw new Error("Avaliação não encontrada.");
    }
    // Verifica se 'usuario_id' foi enviado e se esse usuário existe
    if ("usuario_id" in updates) {
      const validId = validateNumber(updates.usuario_id, "usuario_id");
      const usuarioExiste = await UsuarioService.getById(validId);
      if (!usuarioExiste) {
        throw new Error("Usuário não encontrado.");
      }
    }
    // Verifica se 'estabelecimento_id' foi enviado e se esse estabelecimento existe
    if ("estabelecimento_id" in updates) {
      const validId = validateNumber(
        updates.estabelecimento_id,
        "estabelecimento_id"
      );
      const estabelecimentoExiste = await UsuarioService.getById(validId);
      if (!estabelecimentoExiste) {
        throw new Error("Estabelecimento não encontrado.");
      }
    }
    // Verifica se 'estabelecimento_id' foi enviado e se esse estabelecimento existe
    if ("estabelecimento_id" in updates) {
      const validId = validateNumber(
        updates.estabelecimento_id,
        "estabelecimento_id"
      );
      const estabelecimentoExiste = await UsuarioService.getById(validId);
      if (!estabelecimentoExiste) {
        throw new Error("Usuário não encontrado.");
      }
      // Valida os dados conforme schema
      const camposValidos = cleanObject(updates);
      const validados = Usuario.validateBySchema(camposValidos);
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
