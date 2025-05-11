const AnexoService = require("../services/AnexoService");

class AnexoController {
  static async upload(req, res) {
    try {
      const file = req.file
      const { entidade_tipo, entidade_id, folder } = req.body
      if (!file){
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' })
      }
      const upload = await AnexoService.upload(file, entidade_tipo, entidade_id, folder)
      return res.status(200).json(upload)
    } catch (error) {
      console.error('Erro no upload do anexo:', error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const anexo = await AnexoService.getById(req.params.id);
      return res.status(200).json(anexo);
    } catch (error) {
      console.error(`Erro ao buscar anexo #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async download(req, res) {
    try {
      const fileStream = await AnexoService.getFileStream(req.params.id);
      fileStream.pipe(res);
    } catch (error) {
      return res.status(404).json({ error: 'Arquivo não encontrado.' });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await AnexoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todos anexos:");
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const anexo = await AnexoService.update(req.params.id, req.body);
      return res.status(200).json(anexo);
    } catch (error) {
      console.error(`Erro ao atualizar anexo #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const anexo = await AnexoService.delete(req.params.id);
      return res.status(200).send(anexo);
    } catch (error) {
      console.error(`Erro ao deletar anexo #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AnexoController;
