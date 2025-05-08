const Pagamento = require("../model/Pagamento");
const UsuarioService = require("./usuario_service");
const supabase = require("../config/db");
const { validateNumber } = require("../validators/validators");

class PagamentoService {
  static async create(pagamento) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!pagamento || typeof pagamento !== "object") {
      throw new Error("Dados inválidos ou não fornecidos.");
    }
    const validated = Pagamento.validateBySchema(pagamento);
    // Verifica se usuário com 'usuario_id' existe
    const usuario = await UsuarioService.getById(validated.usuario_id);
    if (!usuario) throw new Error("Usuário não encontrado.");
    // Insere no supabase
    const { data, error } = await supabase
      .from("pagamentos")
      .insert(validated)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("pagamentos")
      .select("*")
      .eq("id", validateNumber(id, "pagamento_id"))
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getStatus(id) {
    const { data, error } = await supabase
      .from("pagamentos")
      .select("status")
      .eq("id", validateNumber(id, "pagamento_id"))
      .single();
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

  static async updateStatus(id, novoStatus) {
    if (!id || !novoStatus)
      throw new Error("Atualizações inválidas ou não fornecidas.");
    const idValido = validateNumber(id);
    const validado = Pagamento.validate(novoStatus, "status");
    const { data, error } = await supabase
      .from("pagamentos")
      .update({ status: validado })
      .eq("id", idValido)
      .select("status")
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Pagamento não encontrado ou não atualizado.");
    return data;
  }

  static async update(id, updates) {
    const pagamentoId = validateNumber(id);
    if (!updates || typeof updates !== "object")
      throw new Error("Atualizações inválidas ou não fornecidas.");
    const validados = Pagamento.validateBySchema(updates);
    if (Object.keys(validados).length === 0)
      throw new Error("Nenhuma alteração válida detectada.");
    // Verifica se usuario_id existe, caso esteja nos updates
    if (validados.usuario_id) {
      const idValido = validateNumber(validados.usuario_id, "usuario_id");
      const usuario = await UsuarioService.getById(idValido);
      if (!usuario) {
        throw new Error("Usuário informado não existe.");
      }
    }
    const { data, error } = await supabase
      .from("pagamentos")
      .update(validados)
      .eq("id", pagamentoId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Pagamento não encontrado ou não atualizado.");
    return data;
  }

  static async delete(id) {
    // Verifica se o registro existe antes de atualizar
    const pagamento = await this.getById(validateNumber(id, "avaliacao_id"));
    if (!pagamento) {
      throw new Error("Pagamento não encontrado para remoção.");
    }
    const { data, error } = await supabase
      .from("pagamentos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = PagamentoService;
