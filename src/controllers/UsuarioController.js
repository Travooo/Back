const UsuarioService = require('../services/UsuarioService')

class UsuarioController {
  static async create(req, res) {
    try {
      const new_user = await UsuarioService.create(req.body)
      return res.status(201).json(new_user)
    } catch (error) {
      console.error('Erro ao criar usuário:')
      return res.status(400).json({ error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const data = await UsuarioService.getById(req.params.id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }

  static async getAll(req, res) {
    try {
      const data = await UsuarioService.getAll()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const data = await UsuarioService.update(req.params.id, req.body)
      console.log('Retorno do service:', data)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      await UsuarioService.delete(req.params.id)
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = UsuarioController
