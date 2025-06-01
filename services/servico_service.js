const supabase = require("../config/db");

class ServicoService {
  static async create(servico) {
    const { data, error } = await supabase
      .from("servicos")
      .insert(servico)
      .select()
      .single();
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    if (error) throw new Error(error.message);
    return data;
  }

  static async getAll() {
    const { data, error } = await supabase.from("servicos").select("*");
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async getAllByTipo(tipo) {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("tipo", tipo);
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getAllByOrg(organizacao_id) {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("usuario_organizacao_id", organizacao_id);
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async getAllByTipoAndOrg(tipo, organizacao_id) {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("usuario_organizacao_id", organizacao_id)
      .eq("tipo", tipo);
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async update(servico_id, updates) {
    const { data, error } = await supabase
      .from("servicos")
      .update(updates)
      .eq("id", servico_id)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new Error("Resposta do banco de dados não retornada.");
    return data;
  }

  static async delete(servico_id) {
    const { data, error } = await supabase
      .from("servicos")
      .delete()
      .eq("id", servico_id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = ServicoService;