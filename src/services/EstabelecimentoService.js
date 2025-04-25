const Estabelecimento = require("../models/Estabelecimento");
const supabase = require("../config/supabaseClient");
const { validateNumber, cleanObject } = require("../utils/validators");
const UsuarioOrganizacaoService = require("./UsuarioOrganizacaoService");

class EstabelecimentoService {
  static async create(estabelecimento) {
    if (!estabelecimento || typeof estabelecimento !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = Estabelecimento.validateBySchema(estabelecimento);
    // Verifica se já existe estabelecimento com 'usuario_organizacao_id'
    const organizacao = await UsuarioOrganizacaoService.getById(
      validated.usuario_organizacao_id
    );
    if (!organizacao) {
      throw new Error(
        `Usuário organização #${validated.usuario_organizacao_id} não encontrado.`
      );
    }
    const { data, error } = await supabase
      .from("estabelecimentos")
      .insert(validated)
      .select()
      .maybeSingle();
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id) {
    const validId = validateNumber(id, "estabelecimento_id");
    const { data, error } = await supabase
      .from("estabelecimentos")
      .select("*")
      .eq("id", validId)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("estabelecimentos").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    const validId = validateNumber(id, "estabelecimento_id");
    // Verifica se o estabelecimento existe antes de atualizar
    const existente = await this.getById(validId);
    if (!existente) throw new Error("Estabelecimento não encontrado.");
    // Valida os dados conforme schema
    const camposValidos = cleanObject(updates);
    const validados = Estabelecimento.validateBySchema(camposValidos);
    // Inserção no banco
    const { data, error } = await supabase
      .from("estabelecimentos")
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
    const estabelecimento = await EstabelecimentoService.getById(
      validateNumber(id, "estabelecimento_id")
    );
    if (!estabelecimento) {
      throw new Error("Estabeleciment não encontrado.");
    }
    const { data, error } = await supabase
      .from("estabelecimentos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = EstabelecimentoService;
