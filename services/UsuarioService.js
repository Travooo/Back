require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const Usuario = require("../models/Usuario");

class UsuarioService {
  static async create(user_data) {
    // Aqui, a própria instanciação valida a integridade do objeto:
    try {
      const usuario = new Usuario(
        user_data.email,
        user_data.senha,
        user_data.nome_usuario,
        user_data.nome_completo,
        user_data.foto_perfil,
        user_data.sobre,
        new Date(user_data.data_nascimento),
        user_data.admin,
        user_data.tipo_plano
      );
      // =============
      // Sem modelo de dados/classes, mapearia user_data para validar os values:
      // ➔ { email, senha, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, tipo_plano } =  user_data;
      // ➔ const usuario = { email, senha, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, tipo_plano };
      // ➔ if (!email || !senha || !nome_usuario || !nome_completo || !data_nascimento) throw new Error("Campos obrigatórios ausentes.");
      // =============

      // Hash da senha antes da inserção:
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(usuario.senha, salt);

      // Inserção no Supabase: passa os atributos do objeto em JSON:
      const { data, error } = await supabase
        .from("usuarios")
        .insert({
          email: usuario.email,
          senha: usuario.senha,
          nome_usuario: usuario.nome_usuario,
          nome_completo: usuario.nome_completo,
          foto_perfil: usuario.foto_perfil,
          sobre: usuario.sobre,
          data_nascimento: usuario.data_nascimento,
          admin: usuario.admin,
          tipo_plano: usuario.tipo_plano,
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
      .from("usuarios")
      .select(
        "id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano"
        // .select("*") traria também a senha.
      )
      .eq("id", id)
      .single();
    if (error) return Error(error.message);
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase
      .from("usuarios")
      .select(
        "id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano"
      );
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
    // Caso não seja implementada a verificação no front:
    const validUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([_, value]) => value && value.toString().trim() !== ""
      )
    );
    if (Object.keys(validUpdates).length === 0) {
      throw new Error("Nenhuma alteração válida detectada.");
    }
    const { data, error } = await supabase
      .from("usuarios")
      .update(validUpdates)
      .eq("id", id)
      .select();
    if (error) return Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Usuário não encontrado ou não atualizado.");
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id);
    if (error) return Error(error.message);
    return data;
  }
}

module.exports = UsuarioService;
