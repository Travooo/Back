const Usuario = require('../../../models/Usuario')
const bcrypt = require('bcrypt')
const supabase = require('../supabaseClient')
const { validateNumber, validateFoto, getIfExists } = require('../../../utils/validators')
const { usuarioSchema, validateBySchema } = require('../../../utils/schemas/usuarioSchema')

class UsuarioService {
  static async create(user_data) {
    try {
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
      )
      if (
        await getIfExists({
          tabela: 'usuarios',
          coluna: 'email',
          valor: usuario.email,
        })
      ) {
        throw new Error('Já existe um usuário com este email.')
      }
      const salt = await bcrypt.genSalt(10)
      usuario.senha = await bcrypt.hash(usuario.senha, salt)
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
        .select()
      if (error) {
        throw new Error(error.message)
      }
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getById(id) {
    return await getIfExists({
      tabela: 'usuarios',
      coluna: 'id',
      valor: validateNumber(id),
      campos:
        'id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano',
    })
  }

  static async getAll() {
    const { data, error } = await supabase
      .from('usuarios')
      .select(
        'id, email, nome_usuario, nome_completo, foto_perfil, sobre, data_nascimento, admin, created_at, tipo_plano'
      )
    if (error) throw new Error(error.message)
    return data
  }

  static async update(id, updates) {
    const usuariodId = validateNumber(id, 'usuario_id')
    if (!updates || typeof updates !== 'object') {
      throw new Error('Atualizações inválidas ou não fornecidas.')
    }
    const validados = {}
    for (const key in updates) {
      if (!(key in usuarioSchema)) continue
      if (key === 'senha') {
        const senhaValida = validateBySchema(updates[key], usuarioSchema[key])
        const salt = await bcrypt.genSalt(10)
        validados.senha = await bcrypt.hash(senhaValida, salt)
      } else if (key === 'foto_perfil') {
        validados.foto_perfil = validateFoto(updates[key])
      } else {
        validados[key] = validateBySchema(updates[key], usuarioSchema[key])
      }
    }
    if (Object.keys(validados).length === 0) { throw new Error('Nenhuma alteração válida detectada.')
    const { data, error } = await supabase.from('usuarios').update(validados).eq('id', usuariodId).select()
    if (error) throw new Error(error.message)
    if (!data || data.length === 0) throw new Error('Usuário não encontrado ou não atualizado.')
    return data
  }

  static async delete(id) {
    const usuariodId = validateNumber(id, 'id')
    const { data, error } = await supabase.from('usuarios').delete().eq('id', usuariodId)
    if (error) throw new Error(error.message)
    return data
  }
}

module.exports = UsuarioService
