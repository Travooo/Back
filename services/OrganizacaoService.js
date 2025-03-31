const Organizacao = require("../models/Organizacao");

class OrganizacaoService {
  static async create(user_data) {
    const usuario = new UsuarioOrganizacao(user_data);
    const { data, error } = await supabase
      .from("usuario_organizacao")
      .insert([UsuarioOrganizacao])
      .select();
    //*SELECT() retorna os dados inseridos (útil para validação)*/
    return { data, error };
  }

  static async get_by_id(id) {
    return await supabase
      .from("usuario_organizacao")
      .select(
        "id, cnpj, nome_fantasia, email, nome_fantasia, cnpj, telefone"
        // .select("*") traria também a senha.
      )
      .eq("id", id)
      .single();
    //*SINGLE() assegura apenas um retorno*
  }

  static async get_all() {
    return await supabase
      .from("usuario_organizacao")
      .select(
        "id, cnpj, nome_fantasia, created_at, email, telefone, razao_social"
      );
    // .select("*") traria também a senha.
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
      .from("usuario_organizacao")
      .update(validUpdates)
      .eq("id", id)
      .select();
    //*SELECT() retorna os dados inseridos (útil para validação)*/

    if (error) throw new Error(error.message);
    if (!data || data.length === 0)
      throw new Error("Usuário não encontrado ou não atualizado.");

    return data;
  }

  static async delete(id) {
    return await supabase.from("usuario_organizacao").delete().eq("id", id);
  }
}

module.exports = OrganizacaoService;
