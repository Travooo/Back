require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const Organizacao = require("../models/Organizacao");

class OrganizacaoService {
  static async create(user_data) {
    // Aqui, a própria instanciação valida a integridade do objeto:
    try {
      const organizacao = new Organizacao(
        user_data.cnpj,
        user_data.nome_fantasia,
        user_data.email,
        user_data.telefone,
        user_data.razao_social,
        user_data.senha
      );
      // =============
      // Sem modelo de dados/classes:
      // ➔ { email, senha, nome_Organizacao, nome_completo, foto_perfil, sobre, data_nascimento, admin, tipo_plano } =  data;
      // ➔ const Organizacao = { email, senha, nome_Organizacao, nome_completo, foto_perfil, sobre, data_nascimento, admin, tipo_plano };
      // ➔ if (!email || !senha || !nome_Organizacao || !nome_completo || !data_nascimento) throw new Error("Campos obrigatórios ausentes.");
      // =============

      // Hash da senha antes da inserção:
      const salt = await bcrypt.genSalt(10);
      organizacao.senha = await bcrypt.hash(organizacao.senha, salt);

      // Inserção no Supabase: passa os atributos do objeto em JSON:
      const { data, error } = await supabase
        .from("organizacoes")
        .insert({
          cnpj: organizacao.cnpj,
          nome_fantasia: organizacao.nome_fantasia,
          email: organizacao.email,
          telefone: organizacao.telefone,
          razao_social: organizacao.razao_social,
          senha: organizacao.senha,
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
      .from("organizacoes")
      .select("cnpj, nome_fantasia, email, telefone, razao_social")
      .eq("id", id)
      .single();
    if (error) return Error(error.message);
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase
      .from("organizacoes")
      .select("cnpj, nome_fantasia, email, telefone, razao_social");
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updates) {
    // Hash da senha antes da inserção:
    if (updates.senha) {
      const salt = await bcrypt.genSalt(10);
      updates.senha = await bcrypt.hash(updates.senha, salt);
    }

    // Filtrar apenas os campos válidos, removendo valores nulos ou vazios:
    const validUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([_, value]) => value && value.toString().trim() !== ""
      )
    );
    if (Object.keys(validUpdates).length === 0) {
      throw new Error("Nenhuma alteração válida detectada.");
    }
    const { data, error } = await supabase
      .from("organizacoes")
      .update(validUpdates)
      .eq("id", id)
      .select();
    if (error) return Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Organização não encontrada ou não atualizada.");
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase
      .from("organizacoes")
      .delete()
      .eq("id", id);
    if (error) return Error(error.message);
    return data;
  }
}

module.exports = OrganizacaoService;
