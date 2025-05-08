const LocalVisitadoService = require('../services/LocalVisitadoService')

class LocalVisitadoController {
  static async create(req, res) {
    try {
      const localVisitado = await LocalVisitadoService.create(req.body)
      return res.status(201).json(localVisitado)
    } catch (error) {
      console.error('Erro ao criar local visistado:')
      return res.status(400).json({ error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const localVisitado = await LocalVisitadoService.getById(req.params.id)
      return res.status(200).json(localVisitado)
    } catch (error) {
      console.error(`Erro ao buscar local visistado #${req.params.id}:`)
      return res.status(404).json({ error: error.message })
    }
  }

  static async getAll(req, res) {
    try {
      const localVisitado = await LocalVisitadoService.getAll()
      return res.status(200).json(localVisitado)
    } catch (error) {
      console.error('Erro ao buscar todos locais visitados:')
      return res.status(500).json({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const localVisitado = await LocalVisitadoService.update(req.params.id, req.body)
      return res.status(200).json(localVisitado)
    } catch (error) {
      console.error(`Erro ao atualizar local visitado #${req.params.id}:`)
      return res.status(400).json({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      await LocalVisitadoService.delete(req.params.id)
      return res.status(200).send()
    } catch (error) {
      console.error(`Erro ao deletar local visitado #${req.params.id}:`)
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = LocalVisitadoController
