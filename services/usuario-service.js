const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const Usuario = require("../model/Usuario");

class UsuarioService {
  static async create(user_data) {
    const usuario = new Usuario(user_data);
    const { data, error } = await supabase
      .from("usuario")
      .insert([usuario])
      .select();
    //*SELECT() retorna os dados inseridos (útil para validação)*/
    return { data, error };
  }

  static async get_by_id(id) {
    return await supabase
      .from("usuario")
      .select(
        "id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at"
        // .select("*") traria também a senha.
      )
      .eq("id", id)
      .single();
    //*SINGLE() assegura apenas um retorno*
  }

  static async get_all() {
    return await supabase.from("usuario").select(
      "id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at"
      // .select("*") traria também a senha.
    );
  }

  static async update(id, updates) {
    let validUpdates = {};

    // Filtrar apenas os campos válidos, removendo valores nulos ou vazios:
    Object.keys(updates).forEach((key) => {
      if (updates[key] && updates[key].toString().trim() !== "") {
        validUpdates[key] = updates[key];
      }
    });

    // Caso não seja implementada a verificação no front:
    if (Object.keys(validUpdates).length === 0) {
      throw new Error("Nenhuma alteração válida detectada.");
    }

    const { data, error } = await supabase
      .from("usuario")
      .update(validUpdates)
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Usuário não encontrado ou não atualizado.");

    return data;
  }

  static async delete(id) {
    return await supabase.from("usuario").delete().eq("id", id);
  }
}

module.exports = UsuarioService;
