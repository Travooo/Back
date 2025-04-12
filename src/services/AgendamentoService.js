const { validateNumber, getIfExists } = require('../utils/validators')
const Agendamento = require('../models/Agendamento')
const supabase = require('../config/supabaseClient')

class AgendamentoService {
  static async create(agendamento_data) {
    try {
      const agendamento = new Agendamento(agendamento_data)

      const estabelecimentoExiste = await getIfExists({
        tabela: 'estabelecimentos',
        value: agendamento.estabelecimento_id,
      }).catch(() => null)
      if (!estabelecimentoExiste) {
        throw new Error(`Estabelecimento #${agendamento.estabelecimento_id} não localizado no Supabase.`)
      }

      const usuarioExiste = await getIfExists({
        tabela: 'usuarios',
        value: agendamento.usuario_id,
      }).catch(() => null)
      if (!usuarioExiste) {
        throw new Error(`Usuário #${agendamento.usuario_id} não localizado no Supabase.`)
      }

      const { data, error } = await supabase.from('agendamentos').insert(agendamento.toJSON()).single().select()
      if (error) {
        throw new Error(error.message)
      }
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getById(id) {
    const agendamentoId = validateNumber(id, 'agendamento_id')
    const { data, error } = await supabase.from('agendamentos').select('*').eq('id', agendamentoId).single()
    if (error) return Error(error.message)
    return data
  }

  static async getAll() {
    const { data, error } = await supabase.from('agendamentos').select('*')
    if (error) throw new Error(error.message)
    return data
  }

  static async update(id, updates) {
    const agendamentoId = validateNumber(id, 'agendamento_id')
    if (!updates || typeof updates !== 'object') {
      throw new Error('Atualizações inválidas ou não fornecidas.')
    }
    const validados = {}
    for (const key of Object.keys(updates)) {
      if (!Agendamento.getValidKeys().includes(key)) continue
      validados[key] = Agendamento.validateBySchema({ [key]: updates[key] })[key]
    }
    const { data, error } = await supabase.from('agendamentos').update(validados).eq('id', agendamentoId).select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  static async delete(id) {
    const agendamentoId = validateNumber(id, 'agendamento_id')
    const { data, error } = await supabase.from('agendamentos').delete().eq('id', agendamentoId)
    if (error) return Error(error.message)
    return data
  }
}

module.exports = AgendamentoService
