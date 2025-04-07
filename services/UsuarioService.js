require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { validateNomeUsuario, validateNomeCompleto, validateFotoPerfilBase64, validateEmail, validateSenha, validateSobre, tryParseBoolean, tryParseInt, tryParseDate } = require('../utilities/parseSafe');

class UsuarioService {
  static async create(user_data) {
    try {
      const usuario = new Usuario(user_data.email, user_data.senha, user_data.nome_usuario, user_data.nome_completo, user_data.foto_perfil, user_data.sobre, user_data.data_nascimento, user_data.admin, user_data.tipo_plano);
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(usuario.senha, salt);
      const { data, error } = await supabase
        .from('usuarios')
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
    const { data, error } = await supabase.from('usuarios').select('id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano').eq('id', id).single();
    if (error) return Error(error.message);
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase.from('usuarios').select('id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano');
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== 'object') throw new Error('Atualizações inválidas ou não fornecidas.');
    const validados = {};
    if ('email' in updates) validados.email = validateEmail(updates.email);
    if ('senha' in updates) {
      const salt = await bcrypt.genSalt(10);
      validados.senha = await bcrypt.hash(validateSenha(updates.senha), salt);
    }
    if ('nome_usuario' in updates) validados.nome_usuario = validateNomeUsuario(updates.nome_usuario);
    if ('nome_completo' in updates) validados.nome_completo = validateNomeCompleto(updates.nome_completo);
    if ('foto_perfil' in updates) validados.foto_perfil = validateFotoPerfilBase64(updates.foto_perfil);
    if ('sobre' in updates) validados.sobre = validateSobre(updates.sobre);
    if ('data_nascimento' in updates) validados.data_nascimento = tryParseDate(updates.data_nascimento);
    if ('admin' in updates) validados.admin = tryParseBoolean(updates.admin);
    if ('tipo_plano' in updates) validados.tipo_plano = tryParseInt(updates.tipo_plano);
    if (Object.keys(validados).length === 0) throw new Error('Nenhuma alteração válida detectada.');
    const { data, error } = await supabase.from('usuarios').update(validados).eq('id', id).select();
    if (error) return Error(error.message);
    if (!data || data.length === 0) throw new Error('Usuário não encontrado ou não atualizado.');
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase.from('usuarios').delete().eq('id', id);
    if (error) return Error(error.message);
    return data;
  }
}

module.exports = UsuarioService;
