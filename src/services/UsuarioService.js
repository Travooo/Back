const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const supabase = require('../config/supabaseClient')
const { validateNumber, getIfExists } = require('../utils/validators')

class UsuarioService {
  static async create(user) {
    try {
      const usuario = new Usuario(user)

      const emailExistente = await getIfExists({
        tabela: 'usuarios',
        coluna: 'email',
        value: usuario.email,
        select: 'id',
      }).catch(() => null)
      if (emailExistente) {
        throw new Error('Já existe um usuário com este email.')
      }

      const salt = await bcrypt.genSalt(10)
      usuario.senha = await bcrypt.hash(usuario.senha, salt)

      const { data, error } = await supabase.from('usuarios').insert(usuario.toJSON()).single().select()
      if (error) {
        throw new Error(error.message)
      }
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getById(id) {
    const usuarioId = validateNumber(id, 'usuario_id')
    const { senha, ...rest } = await getIfExists({
      tabela: 'usuarios',
      value: usuarioId,
      campos: '*',
    })
    return rest
  }

  static async getAll() {
    const { data, error } = await supabase.from('usuarios').select('*')
    if (error) throw new Error(error.message)
    return data.map(({ senha, ...rest }) => rest)
  }

  static async update(id, updates) {
    const usuariodId = validateNumber(id, 'usuario_id')
    if (!updates || typeof updates !== 'object') {
      throw new Error('Atualizações inválidas ou não fornecidas.')
    }

    const validados = {}
    for (const key of Object.keys(updates)) {
      if (!Usuario.getValidKeys().includes(key)) continue

      if (key === 'senha') {
        const salt = await bcrypt.genSalt(10)
        validados.senha = await bcrypt.hash(updates.senha, salt)
      } else {
        validados[key] = Usuario.validateBySchema({ [key]: updates[key] })[key]
      }
    }

    const { data, error } = await supabase.from('usuarios').update(validados).eq('id', usuariodId).select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  static async delete(id) {
    const usuariodId = validateNumber(id, 'usuario_id')
    const { data, error } = await supabase.from('usuarios').delete().eq('id', usuariodId)
    if (error) throw new Error(error.message)
    return data
  }
}

module.exports = UsuarioService
