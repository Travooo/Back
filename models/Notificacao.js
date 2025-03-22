// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class Notificacoes {
  constructor(id_notificacoes = null, titulo, descricao, id_usuario) {
    this.id_notificacoes = id_notificacoes;
    this.titulo = titulo;
    this.descricao = descricao;
    this.id_usuario = id_usuario;
  }
}

module.exports = Notificacoes;
