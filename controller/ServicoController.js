const ServicoService = require("../services/ServicoService");
const axios = require("axios")

class ServicoController {
 static async create(req, res) {
    try {
      const { endereco, ...resto } = req.body;

      if (!endereco) {
        return res.status(400).json({ error: "Endereço é obrigatório" });
      }

      //Transformar endereço em lat, lng com google API
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(geocodeUrl);
      const data = response.data;
      if (data.status !== 'OK' || data.results.length === 0) {
        return res.status(400).json({ error: "Endereço inválido ou não encontrado" });
      }
      const location = data.results[0].geometry.location;

      const dadosFinal = {
        ...resto,
        endereco,
        lat: location.lat,
        lng: location.lng,
      };
      
      const servico = await ServicoService.create(dadosFinal);

      return res.status(201).json(servico);

    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await ServicoService.getById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar serviço #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ServicoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todos serviços:");
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await ServicoService.update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao atualizar serviço #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ServicoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error(`Erro ao deletar serviço #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ServicoController;
