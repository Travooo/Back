// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

class UsuarioOrganizacaoService {
  static async create(usuarioOrganizacao) {
    return await supabase
      .from("usuario_organizacao")
      .insert([usuarioOrganizacao])
      .select();
  }

  static async getById(id) {
    return await supabase
      .from("usuario_organizacao")
      .select("*")
      .eq("id_usuario_organizacao", id)
      .single();
  }

  static async getAll() {
    return await supabase.from("usuario_organizacao").select("*");
  }

  static async update(id, updates) {
    return await supabase
      .from("usuario_organizacao")
      .update(updates)
      .eq("id_usuario_organizacao", id);
  }

  static async delete(id) {
    return await supabase
      .from("usuario_organizacao")
      .delete()
      .eq("id_usuario_organizacao", id);
  }
}

module.exports = UsuarioOrganizacaoService;
