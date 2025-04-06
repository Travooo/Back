require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const Pagamento = require("../models/Pagamento");

class PagamentoService {
  static async create(user_data) {
    try {
      const pagamento = new Pagamento(
        user_data.valor,
        user_data.metodo_pagamento,
        user_data.status,
        user_data.usuario_id
      );
      // =============
      // Sem modelo de dados/classes, mapearia user_data para validar os values:
      // ➔ { valor, metodo_pagamento, status, usuario_id } =  user_data;
      // ➔ const pagamento = { valor, metodo_pagamento, status, usuario_id };
      // ➔ if (!valor || !metodo_pagamento || !status || !usuario_id) throw new Error("Campos obrigatórios ausentes.");
      // =============
      // Inserção no Supabase: passa os atributos do objeto em JSON:
      const { data, error } = await supabase
        .from("pagamentos")
        .insert({
          valor: pagamento.valor,
          metodo_pagamento: pagamento.metodo_pagamento,
          status: pagamento.status,
          usuario_id: pagamento.usuario_id,
        })
        .single()
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
    if (error) return Error(error.message);
    return data;
  }

  static async get_status(id) {
    const { data, error } = await supabase
      .from("pagamentos")
      .select("status")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Pagamento não encontrado.");
    return data;
  }

  static async update_status(id, novoStatus) {
    const statusPermitidos = ["pendente", "pago", "cancelado", "estornado"];
    if (!statusPermitidos.includes(novoStatus)) {
      throw new Error("Status inválido.");
    }
    const { data, error } = await supabase
      .from("pagamentos")
      .update({ status: novoStatus })
      .eq("id", id)
      .select("status")
      .single();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) {
      throw new Error("Pagamento não encontrado ou não atualizado.");
    }
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase.from("pagamentos").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updates) {
    // Filtrar apenas os campos válidos, removendo valores nulos ou vazios (caso não seja implementada a verificação no front):
    const validUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([_, value]) => value && value.toString().trim() !== ""
      )
    );
    if (Object.keys(validUpdates).length === 0) {
      throw new Error("Nenhuma alteração válida detectada.");
    }
    const { data, error } = await supabase
      .from("pagamentos")
      .update(validUpdates)
      .eq("id", id)
      .select();
    if (error) return Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Pagamento não encontrado ou não atualizado.");
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase
      .from("pagamentos")
      .delete()
      .eq("id", id);
    if (error) return Error(error.message);
    return data;
  }
}

module.exports = PagamentoService;
