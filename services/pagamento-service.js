const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const Pagamento = require("../models/Pagamento");

class PagamentoService {
  static async create(payment_data) {
    try {
      //==================
      // CASO COM MODELS:
      //==================
      const pagamento = new Pagamento(
        payment_data.id_usuario,
        payment_data.valor,
        payment_data.metodo_pagamento,
        payment_data.status
      );
      //==================
      // CASO SEM MODELS:
      //==================
      //const { id_usuario, valor, metodo_pagamento, status } = payment_data;
      //const pagamento = { id_usuario, valor, metodo_pagamento, status };
      //if (!id_usuario || !valor || !metodo_pagamento || !status) {
      //throw new Error("Campos obrigatórios ausentes ou inválidos.");
      //}
      const { data, error } = await supabase
        .from("pagamentos")
        .insert([pagamento])
        .select();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async get_by_id(id) {
    const { data, error } = await supabase
      .from("pagamentos")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase.from("pagamentos").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  static async get_status(id) {
    const { data, error } = await supabase
      .from("pagamentos")
      .select("status")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  static async update_status(id, new_status) {
    // VALIDAR STATUS
    const statusPermitidos = ["pendente", "pago", "cancelado", "estornado"];
    if (!statusPermitidos.includes(new_status)) {
      throw new Error("Status inválido.");
    }
    const { data, error } = await supabase
      .from("pagamentos")
      .update({ status: new_status })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  }

  static async delete(id) {
    return await supabase.from("pagamentos").delete().eq("id", id);
  }
}

module.exports = PagamentoService;
