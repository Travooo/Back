const AvaliacaoService = require('../services/AvaliacaoService')

class AvaliacaoController {
  static async create(req, res) {
    try {
      const new_avaliacao = await AvaliacaoService.create(req.body)
      return res.status(201).json(new_avaliacao)
    } catch (error) {
      console.error('Erro ao criar avaliação:')
      return res.status(400).json({ error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const data = await AvaliacaoService.getById(req.params.id)
      return res.status(200).json(data)
    } catch (error) {
      console.error(`Erro ao buscar avaliação #${req.params.id}:`)
      return res.status(404).json({ error: error.message })
    }
  }

  static async getAll(req, res) {
    try {
      const data = await AvaliacaoService.getAll()
      return res.status(200).json(data)
    } catch (error) {
      console.error('Erro ao buscar todas avaliações:')
      return res.status(500).json({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const data = await AvaliacaoService.update(req.params.id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      console.error(`Erro ao atualizar avaliação #${req.params.id}:`)
      return res.status(400).json({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      await AvaliacaoService.delete(req.params.id)
      return res.status(200).send()
    } catch (error) {
      console.error(`Erro ao atualizar avaliação #${req.params.id}:`)
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = AvaliacaoController
