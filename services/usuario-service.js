const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const Usuario = require("../model/Usuario");

class UsuarioService {
  static async create(user_data) {
    try {
      //==================
      // CASO COM MODELS:
      //==================
      if (
        !user_data.email ||
        !user_data.senha ||
        !user_data.nome_usuario ||
        !user_data.nome_completo ||
        !user_data.data_nascimento
      ) {
        throw new Error("Campos obrigatórios ausentes ou inválidos.");
      }
      const usuario = new Usuario(
        user_data.email,
        user_data.senha,
        user_data.nome_usuario,
        user_data.nome_completo,
        user_data.foto_perfil,
        user_data.sobre,
        user_data.data_nascimento,
        user_data.admin,
        user_data.tipo_plano
      );
      //==================
      // CASO SEM MODELS:
      //==================
      //const { email, senha, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, tipo_plano } = user_data;
      //const usuario = { email, senha, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, tipo_plano };
      //if (!email|| !senha || !nome_usurio || !nome_completo || !data_nascimento) {
      //throw new Error("Campos obrigatórios ausentes ou inválidos.");
      //}
      const { data, error } = await supabase
        .from("usuarios")
        .insert([usuario])
        .select();
      //*SELECT() retorna os dados inseridos (útil para validação)*/
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async get_by_id(id) {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select(
          "id, email, senha, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano"
          // .select("*") traria também a senha.
        )
        .eq("id", id)
        .single();
      //*SINGLE() assegura apenas um retorno*
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async get_all() {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select(
          "id, email, senha, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano"
        );
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, updates) {
    try {
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
      if (error) throw new Error(error.message);
      if (!data || data.length === 0)
        throw new Error("Usuário não encontrado ou não atualizado.");
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete() {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UsuarioService;
