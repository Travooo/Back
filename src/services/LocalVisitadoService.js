const LocalVisitado = require("../models/LocalVisitado");
const UsuarioService = require("../services/UsuarioService");
const EstabelecimentoService = require("../services/EstabelecimentoService");
const supabase = require("../config/supabaseClient");
const { validateNumber, cleanObject } = require("../utils/validators");

class LocalVisitadoService {
  static async create(dados) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!dados || typeof dados !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = LocalVisitado.validateBySchema(dados);
    // Verifica se o usuário existe
    const usuario = await UsuarioService.getById(validated.usuario_id);
    if (!usuario) throw new Error("Usuário não encontrado.");
    // Verifica se o estabelecimento existe
    const estabelecimento = await EstabelecimentoService.getById(
      validated.estabelecimento_id
    );
    if (!estabelecimento) throw new Error("Estabelecimento não encontrado.");
    const { data, error } = await supabase
      .from("locais_visitados")
      .insert(validated)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("locais_visitados")
      .select("*")
      .eq("id", validateNumber(id, "local_visitado_id"))
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("locais_visitados").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    const validId = validateNumber(id, "local_visitado_id");
    // Verifica se o registro existe antes de atualizar
    if (!(await this.getById(validId))) {
      throw new Error("Local visitado não encontrado.");
    }
    const camposValidos = cleanObject(updates);
    const validados = LocalVisitado.validateBySchema(camposValidos);
    // Verifica se 'usuario_id' foi enviado e se esse usuário existe
    if ("usuario_id" in validados) {
      const usuario = await UsuarioService.getById(idValido);
      if (!usuario) throw new Error("Usuário não encontrado para atualização.");
    }
    // Verifica se 'estabelecimento_id' foi enviado e se esse estabelecimento existe
    if ("estabelecimento_id" in validados) {
      const estabelecimento = await EstabelecimentoService.getById(
        validados.estabelecimento_id
      );
      if (!estabelecimento)
        throw new Error("Estabelecimento não encontrado para atualização.");
    }
    // Verifica se 'data_visita' é anterior ou igual à atual
    if (
      "data_visita" in validados &&
      new Date(validados.data_visita) > new Date()
    ) {
      throw new Error(
        "A nova data da visita deve ser anterior ou igual à data atual."
      );
    }
    const { data, error } = await supabase
      .from("locais_visitados")
      .update(validados)
      .eq("id", validId)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async delete(id) {
    const localVisitado = await this.getById(
      validateNumber(id, "local_visitado_id")
    );
    if (!localVisitado) throw new Error("Local visitado não encontrado.");
    const { data, error } = await supabase
      .from("locais_visitados")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = LocalVisitadoService;
