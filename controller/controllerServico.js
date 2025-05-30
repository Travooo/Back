const ServicoService = require("../services/servico-service");
const axios = require("axios")

class controllerServico {
  static async create(req, res) {
    try {
      const { cep, numero, ...resto } = req.body;
       console.log(cep)
      if (!cep || !numero) {
        return res.status(400).json({ error: "CEP e número são obrigatórios" });
      }
      //tranformar cep em endereço
      const cepUrl = `https://viacep.com.br/ws/${cep}/json/`;
      const endereco = await axios.get(cepUrl);
      if (endereco.status !== 200) {
        return res.status(400).json({ error: "CEP inválido" });
      }
      const rua = endereco.data.logradouro
      const bairro = endereco.data.bairro
      const enderecoFinal = numero ? `${rua}, ${numero} - ${bairro}` : `${rua} - ${bairro}`;

      //Transformar endereço em lat, lng com google API
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoFinal)}&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(geocodeUrl);
      const data = response.data;
      if (data.status !== 'OK' || data.results.length === 0) {
        return res.status(400).json({ error: "Endereço inválido ou não encontrado" });
      }
      const location = data.results[0].geometry.location;
      const dadosFinal = {
        ...resto,
        cep: cep,
        endereco: enderecoFinal,
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

  static async getByTipo(req, res) {
    try {
      const { tipo } = req.params;
      if (!tipo) {
        return res.status(400).json({ error: "Parâmetro 'tipo' é obrigatório." });
      }
      const data = await ServicoService.getByTipo(tipo);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar serviços por tipo:", error);
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

module.exports = controllerServico;
