const LocalVisitado = require('../models/LocalVisitado')
const UsuarioService = require('../services/UsuarioService')
const EstabelecimentoService = require('../services/EstabelecimentoService')
const supabase = require('../config/supabaseClient')
const { validateNumber } = require('../utils/validators')

class LocalVisitadoService {
  static async create(dados) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!dados || typeof dados !== 'object') {
      throw new Error('Dados inválidos ou não fornecidos.')
    }
    const { estabelecimento_id, usuario_id, data_visita } = dados
    // Verifica se todos os dados foram passados
    if (![estabelecimento_id, usuario_id, data_visita].every((val) => val && val !== '')) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.')
    }
    // Verifica se o usuário existe
    if ((await UsuarioService.getById(validateNumber(usuario_id))) == null) {
      throw new Error('Usuário não encontrado.')
    }
    // Verifica se o estabelecimento existe
    if ((await EstabelecimentoService.getById(validateNumber(estabelecimento_id))) == null) {
      throw new Error('Estabelecimento não encontrado.')
    }
    // Verifica se a data de visita é posterior a hoje
    const hoje = new Date()
    const dataVisita = new Date(data_visita)
    if (dataVisita <= hoje) {
      throw new Error('A data da visita deve ser posterior à data atual.')
    }
    const localVisitado = new LocalVisitado(dados)
    const { data, error } = await supabase.from('locais_visitados').insert([localVisitado.toJSON()]).select().single()
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async getById(id) {
    const { data, error } = await supabase.from('locais_visitados').select('*').eq('id', validateNumber(id, 'local_visitado_id')).maybeSingle()
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async getAll() {
    const { data, error } = await supabase.from('locais_visitados').select('*')
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== 'object') {
      throw new Error('Atualizações inválidas ou não fornecidas.')
    }
    // Verifica se o registro existe antes de atualizar
    const validId = validateNumber(id, 'local_visitado_id')
    if (!(await this.getById(validId))) {
      throw new Error('Local visitado não encontrado.')
    }
    // Verifica se 'usuario_id' foi enviado e se esse usuário existe
    if ('usuario_id' in updates) {
      const idValido = validateNumber(updates.usuario_id, 'usuario_id')
      const usuario = await UsuarioService.getById(idValido)
      if (!usuario) {
        throw new Error('Usuário não encontrado para atualização.')
      }
    }
    // Verifica se 'estabelecimento_id' foi enviado e se esse estabelecimento existe
    if ('estabelecimento_id' in updates) {
      const estIdValido = validateNumber(updates.estabelecimento_id, 'estabelecimento_id')
      const estabelecimento = await EstabelecimentoService.getById(estIdValido)
      if (!estabelecimento) {
        throw new Error('Resposta do banco de dados não retornada.')
      }
    }
    // Valida os dados conforme schema
    const validados = {}
    for (const key of Object.keys(updates)) {
      if (!LocalVisitado.getValidKeys().includes(key)) continue
      const validado = LocalVisitado.validateBySchema({ [key]: updates[key] })
      validados[key] = validado[key]
    }
    const { data, error } = await supabase.from('locais_visitados').update(validados).eq('id', validId).select().single()
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async delete(id) {
    const localVisitado = await LocalVisitadoService.getById(validateNumber(id, 'local_visitado_id'))
    if (!localVisitado) {
      throw new Error('Local visitado não encontrado.')
    }
    const { data, error } = await supabase.from('locais_visitados').delete().eq('id', id).select().single()
    if (error) throw error
    return data
  }
}

module.exports = LocalVisitadoService
