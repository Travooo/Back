const LocalVisitado = require("../model/LocalVisitado");
const UsuarioService = require("./usuario_service");
const ServicoService = require("./servico_service");
const supabase = require("../config/db");
const { validateNumber, cleanObject } = require("../validators/validators");

class LocalVisitadoService {
  static async create(dados) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!dados || typeof dados !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = LocalVisitado.validateBySchema(dados);
    // Verifica se o usuário existe
    const usuario = await UsuarioService.getUsuarioById(validated.usuario_id);
    if (!usuario) throw new Error("Usuário não encontrado.");
    // Verifica se o Servico existe
    const servico = await ServicoService.getById(validated.servico_id);
    if (!servico) throw new Error("Serviço não encontrado.");
    // Verifica se já existe um registro igual
    const { data: existente, error: errorExistente } = await supabase
      .from("locais_visitados")
      .select("id")
      .eq("usuario_id", validated.usuario_id)
      .eq("servico_id", validated.servico_id)
      .eq("data_visita", validated.data_visita)
      .maybeSingle();
    if (errorExistente) throw errorExistente;
    if (existente) {
      throw new Error(
        "Já existe um local visitado para este usuário, serviço e data."
      );
    }
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
      const usuario = await UsuarioService.getUsuarioById(validados.usuario_id);
      if (!usuario) throw new Error("Usuário não encontrado para atualização.");
    }
    // Verifica se 'Servico_id' foi enviado e se esse Servico existe
    if ("servico_id" in validados) {
      const servico = await ServicoService.getById(validados.servico_id);
      if (!servico) throw new Error("Servico não encontrado para atualização.");
    }
    // Se usuario_id, servico_id e data_visita foram enviados, validar duplicidade
    if (validados.usuario_id && validados.servico_id && validados.data_visita) {
      const { data: existente, error: errorExistente } = await supabase
        .from("locais_visitados")
        .select("id")
        .eq("usuario_id", validados.usuario_id)
        .eq("servico_id", validados.servico_id)
        .eq("data_visita", validados.data_visita)
        .neq("id", validId) // <- Exclui o próprio registro
        .maybeSingle();
      if (errorExistente) throw errorExistente;
      if (existente) {
        throw new Error(
          "Já existe um registro com este usuário, serviço e data."
        );
      }
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
