const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

class UsuarioService {
  static async create(user_data) {
    const usuario = new Usuario(user_data);
    const { data, error } = await supabase
      .from("usuario")
      .insert([usuario])
      .select();
    //*SELECT() returns inserted data (useful for validation)*/
    return { data, error };
  }

  static async get_by_id(id) {
    return await supabase
      .from("usuario")
      .select(
        "id_usuario, admin, email, nome_usuario, nome_completo, sobre, foto_perfil, data_nascimento"
        // .select("*") traria também a senha.
      )
      .eq("id_usuario", id)
      .single();
    //*SINGLE() ensures only one return*
  }

  static async get_all() {
    return await supabase.from("usuario").select(
      "id_usuario, admin, email, nome_usuario, nome_completo, sobre, foto_perfil, data_nascimento"
      // .select("*") traria também a senha.
    );
  }

  static async update(id, updates) {
    let validUpdates = {};

    // Filtrar apenas os campos válidos, removendo valores nulos ou vazios
    Object.keys(updates).forEach((key) => {
      if (updates[key] && updates[key].toString().trim() !== "") {
        validUpdates[key] = updates[key];
      }
    });

    if (Object.keys(validUpdates).length === 0) {
      throw new Error("Nenhuma alteração válida detectada.");
    }

    const { data, error } = await supabase
      .from("usuario")
      .update(validUpdates)
      .eq("id_usuario", id)
      .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Usuário não encontrado ou não atualizado.");

    return data;
  }

  static async delete(id) {
    return await supabase.from("usuario").delete().eq("id_usuario", id);
  }
}

module.exports = UsuarioService;
