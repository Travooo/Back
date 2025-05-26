const Servico = require("../model/Servico");
const supabase = require("../config/db");
const { validateNumber, cleanObject } = require("../validators/validators");
const UsuarioOrganizacaoService = require("./usuarioOrganizacao_service");

class ServicoService {
  static async create(servico) {
    if (!servico || typeof servico !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = Servico.validateBySchema(servico);
    // Verifica se já existe serviço com 'usuario_organizacao_id'
    const organizacao = await UsuarioOrganizacaoService.getUsuarioOrgById(
      validated.usuario_organizacao_id
    );
    if (!organizacao) {
      throw new Error(
        `Usuário organização #${validated.usuario_organizacao_id} não encontrado.`
      );
    }
    const { data, error } = await supabase
      .from("servicos")
      .insert(validated)
      .select()
      .single();
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    if (error) throw new Error(error.message);
    return data;
  }

  static async getById(id) {
    const validId = validateNumber(id, "servico_id");
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("id", validId)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("servicos").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getByTipo(tipo) {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("tipo", tipo);
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== "object") {
      throw new Error("Atualizações inválidas ou não fornecidas.");
    }
    const validId = validateNumber(id, "service_id");
    // Verifica se o Service existe antes de atualizar
    const existente = await this.getById(validId);
    if (!existente) throw new Error("Serviço não encontrado.");
    // Valida os dados conforme schema
    const camposValidos = cleanObject(updates);
    const validados = Servico.validateBySchema(camposValidos);
    // Inserção no banco
    const { data, error } = await supabase
      .from("servicos")
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
    const servico = await ServicoService.getById(
      validateNumber(id, "service_id")
    );
    if (!servico) {
      throw new Error("Serviço não encontrado.");
    }
    const { data, error } = await supabase
      .from("servicos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = ServicoService;
