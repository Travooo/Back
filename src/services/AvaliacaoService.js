const Avaliacao = require('../models/Avaliacao')
const UsuarioService = require('../services/UsuarioService')
const EstabelecimentoService = require('../services/EstabelecimentoService')
const supabase = require('../config/supabaseClient')
const { validateNumber } = require('../utils/validators')

class AvaliacaoService {
  static async create(dados) {
    // Garante que os dados foram recebidos e no formato de objeto
    if (!dados || typeof dados !== 'object') {
      throw new Error('Dados inválidos ou não fornecidos.')
    }
    const { estabelecimento_id, usuario_id, comentario, numero_estrelas, data_comentario } = dados
    // Verifica se todos os dados foram passados
    if (![estabelecimento_id, usuario_id, comentario, numero_estrelas, data_comentario].every((val) => val && val !== '')) {
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
    // Verifica se a data do comentário é igual a data atual
    const hoje = new Date()
    const dataComentario = new Date(data_comentario)
    // Zera as horas para comparar só a data
    hoje.setHours(0, 0, 0, 0)
    dataComentario.setHours(0, 0, 0, 0)
    if (dataComentario.getTime() !== hoje.getTime()) {
      throw new Error('A data do comentário deve ser igual à data atual.')
    }
    const avaliacao = new Avaliacao(dados)
    const { data, error } = await supabase.from('avaliacoes').insert([avaliacao.toJSON()]).select().single()
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async getById(id) {
    const { data, error } = await supabase.from('avaliacoes').select('*').eq('id', validateNumber(id, 'avaliacao_id')).maybeSingle()
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async getAll() {
    const { data, error } = await supabase.from('avaliacoes').select('*')
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async update(id, updates) {
    if (!updates || typeof updates !== 'object') {
      throw new Error('Atualizações inválidas ou não fornecidas.')
    }
    // Verifica se o registro existe antes de atualizar
    const validId = validateNumber(id, 'avaliacao_id')
    if (!(await this.getById(validId))) {
      throw new Error('Avaliação não encontrada.')
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
        throw new Error('Estabelecimento não encontrado para atualização.')
      }
    }
    // Valida os dados conforme schema
    const validados = {}
    for (const key of Object.keys(updates)) {
      if (!Avaliacao.getValidKeys().includes(key)) continue
      const validado = Avaliacao.validateBySchema({ [key]: updates[key] })
      validados[key] = validado[key]
    }
    const { data, error } = await supabase.from('avaliacoes').update(validados).eq('id', validId).select().single()
    if (error) throw error
    if (!data) throw new Error('Resposta do banco de dados não retornada.')
    return data
  }

  static async delete(id) {
    const avaliacao = await AvaliacaoService.getById(validateNumber(id, 'avaliacao_id'))
    if (!avaliacao) {
      throw new Error('Avaliação não encontrada para remoção.')
    }
    const { data, error } = await supabase.from('avaliacoes').delete().eq('id', id).select().single()
    if (error) throw error
    return data
  }
}

module.exports = AvaliacaoService
