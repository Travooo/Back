const EstabelecimentoService = require('../services/EstabelecimentoService')

class EstabelecimentoController {
  static async create(req, res) {
    try {
      const new_estabelecimento = await EstabelecimentoService.create(req.body)
      return res.status(201).json(new_estabelecimento)
    } catch (error) {
      console.error('Erro ao criar estabelecimento:')
      return res.status(400).json({ error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const data = await EstabelecimentoService.getById(req.params.id)
      return res.status(200).json(data)
    } catch (error) {
      console.error(`Erro ao buscar estabelecimento #${req.params.id}:`)
      return res.status(404).json({ error: error.message })
    }
  }

  static async getAll(req, res) {
    try {
      const data = await EstabelecimentoService.getAll()
      return res.status(200).json(data)
    } catch (error) {
      console.error('Erro ao buscar todos estabelecimentos:')
      return res.status(500).json({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const data = await EstabelecimentoService.update(req.params.id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      console.error(`Erro ao atualizar estabelecimento #${req.params.id}:`)
      return res.status(400).json({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      await EstabelecimentoService.delete(req.params.id)
      return res.status(204).send()
    } catch (error) {
      console.error(`Erro ao deletar estabelecimento #${req.params.id}:`)
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = EstabelecimentoController
