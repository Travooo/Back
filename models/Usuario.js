const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

class Usuario {
  constructor(
    id_usuario = null,
    admin,
    email,
    senha,
    nome_usuario,
    nome_completo,
    sobre,
    foto_perfil,
    data_nascimento,
    tipo_plano = null
  ) {
    this.id_usuario = id_usuario;
    this.admin = admin;
    this.email = email;
    this.senha = senha;
    this.nome_usuario = nome_usuario;
    this.nome_completo = nome_completo;
    this.sobre = sobre;
    this.foto_perfil = foto_perfil;
    this.data_nascimento = data_nascimento;
    this.tipo_plano = tipo_plano;
    // Definir o plano 1 por padrão se tipo_plano for null:
    this.tipo_plano = tipo_plano || 1;
  }
}

module.exports = Usuario;
