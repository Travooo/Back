const { validateNumber, getIfExists } = require('../utils/validators')
const Estabelecimento = require('../models/Estabelecimento')
const supabase = require('../config/supabaseClient')

class EstabelecimentoService {
  static async create(estabelecimento_data) {
    try {
      const estabelecimento = new Estabelecimento(estabelecimento_data)

      const organizacaoExiste = await getIfExists({
        tabela: 'usuarios_organizacao',
        coluna: 'id',
        value: estabelecimento.usuario_organizacao_id,
      }).catch(() => null)
      if (!organizacaoExiste) {
        throw new Error(`Usuário organização #${estabelecimento.usuario_organizacao_id} não localizado no Supabase.`)
      }

      const { data, error } = await supabase.from('estabelecimentos').insert(estabelecimento.toJSON()).single().select()
      if (error) {
        throw new Error(error.message)
      }
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getById(id) {
    const estabelecimentoId = validateNumber(id, 'estabelecimento_id')
    const { data, error } = await supabase.from('estabelecimentos').select('*').eq('id', estabelecimentoId).single()
    if (error) return Error(error.message)
    return data
  }

  static async getAll() {
    const { data, error } = await supabase.from('estabelecimentos').select('*')
    if (error) throw new Error(error.message)
    return data
  }

  static async update(id, updates) {
    const estabelecimentoId = validateNumber(id, 'estabelecimento_id')
    if (!updates || typeof updates !== 'object') {
      throw new Error('Atualizações inválidas ou não fornecidas.')
    }

    const validados = {}
    for (const key of Object.keys(updates)) {
      if (!Estabelecimento.getValidKeys().includes(key)) continue
      validados[key] = Estabelecimento.validateBySchema({ [key]: updates[key] })[key]
    }

    const { data, error } = await supabase
      .from('estabelecimentos')
      .update(validados)
      .eq('id', estabelecimentoId)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  static async delete(id) {
    const estabelecimentoId = validateNumber(id, 'estabelecimento_id')
    const { data, error } = await supabase.from('estabelecimentos').delete().eq('id', estabelecimentoId)
    if (error) return Error(error.message)
    return data
  }
}

module.exports = EstabelecimentoService
