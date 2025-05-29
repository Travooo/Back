const Agendamento = require("../model/Agendamento");
const UsuarioService = require("./usuario_service");
const ServicoService = require("./servico-service");
const supabase = require("../config/db");
const { validateNumber, cleanObject } = require("../validators/validators");

class AgendamentoService {
  static async create(dados) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!dados || typeof dados !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = Agendamento.validateBySchema(dados);
    // Verifica se o usuário existe
    const usuario = await UsuarioService.getUsuarioById(validated.usuario_id);
    if (!usuario) throw new Error("Usuário não encontrado.");
    // Verifica se o Servico existe
    const servico = await ServicoService.getById(validated.servico_id);
    if (!servico) throw new Error("Serviço não encontrado.");
    // Verifica se já existe um registro igual
    const { data: existente, error: errorExistente } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("usuario_id", validated.usuario_id)
      .eq("servico_id", validated.servico_id)
      .eq("horario", validated.horario)
      .maybeSingle();
    if (errorExistente) throw errorExistente;
    if (existente) {
      throw new Error(
        "Já existe um agendamento com este usuário, serviço e horario."
      );
    }
    // Insere no banco de dados
    const { data, error } = await supabase
      .from("agendamentos")
      .insert(validated)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .eq("id", validateNumber(id, "agendamento_id"))
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("agendamentos").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    const validId = validateNumber(id, "agendamento_id");
    // Verifica se o registro existe antes de atualizar
    if (!(await this.getById(validId))) {
      throw new Error("Agendamento não encontrado.");
    }
    const camposValidos = cleanObject(updates);
    const validados = Agendamento.validateBySchema(camposValidos);
    // Verifica se 'usuario_id' foi enviado e se esse usuário existe
    if ("usuario_id" in validados) {
      const usuario = await UsuarioService.getUsuarioById(idValido);
      if (!usuario) throw new Error("Usuário não encontrado para atualização.");
    }
    // Verifica se 'Servico_id' foi enviado e se esse Servico existe
    if ("servico_id" in validados) {
      const Servico = await ServicoService.getById(validados.servico_id);
      if (!Servico) throw new Error("Servico não encontrado para atualização.");
    }
    // Verifica se já existe um registro igual
    if (validados.usuario_id && validados.servico_id && validados.data_visita) {
      const { data: existente, error: errorExistente } = await supabase
        .from("locais_visitados")
        .select("id")
        .eq("usuario_id", validados.usuario_id)
        .eq("servico_id", validados.servico_id)
        .eq("data_visita", validados.horario)
        .neq("id", validId)
        .maybeSingle();
      if (errorExistente) throw errorExistente;
      if (existente) {
        throw new Error(
          "Já existe um registro com este usuário, serviço e horário."
        );
      }
    }
    // Insere no banco de dados
    const { data, error } = await supabase
      .from("agendamentos")
      .update(validados)
      .eq("id", validId)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async delete(id) {
    const agendamento = await this.getById(
      validateNumber(id, "agendamento_id")
    );
    if (!agendamento) throw new Error("Agendamento não encontrado.");
    const { data, error } = await supabase
      .from("agendamentos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = AgendamentoService;
