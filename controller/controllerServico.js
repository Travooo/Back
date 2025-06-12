const Servico = require("../model/Servico");
const ServicoService = require('../services/servico_service');
const OrganizacaoService = require('../services/usuarioOrganizacao_service'); 
const axios = require('axios')
const { cleanObject } = require('../validators/validators.js')


class controllerServico {
  static async create(req, res) {
    try {
      const { usuario_organizacao_id } = req.body;
      if (!usuario_organizacao_id) return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes.' });

      const organizacaoValida = await OrganizacaoService.getUsuarioOrgById(Number(usuario_organizacao_id));
      if (!organizacaoValida) return res.status(404).json({ error: `Organização #${usuario_organizacao_id} não encontrada.` });

      // Montar dados finais:
      const validated = Servico.validateBySchema(req.body);
      const servico = await ServicoService.create(validated);
      return res.status(201).json(servico);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ServicoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Erro ao buscar todos serviços:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'ID do serviço não fornecido.' });
      const data = await ServicoService.getById(Number(id));
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar serviço #${id}:, error`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAllByTipo(req, res) {
    try {
      const { tipo } = req.params;
      if (!tipo) return res.status(400).json({ error: 'Tipo do serviço não fornecido.' });
      const data = await ServicoService.getByTipo(tipo);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar serviços pelo tipo '${tipo}':`, error);
      return res.status(500).json({ error: error.message });
    }
  } 

  static async getAllByOrg(req, res) {
    let organizacao_id;
    try {
      const { organizacao_id } = req.params;
      if (!organizacao_id) return res.status(400).json({ error: 'Parâmetro obrigatório não recebido: organizacao_id.' });

      const organizacao = await OrganizacaoService.getUsuarioOrgById(Number(organizacao_id));
      if (!organizacao) return res.status(404).json({ error: `Organização #${organizacao_id} não encontrada.` });

      const data = await ServicoService.getAllByOrg(organizacao_id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar serviços da organização #${organizacao_id}:`, error);
      return res.status(500).json({ error: error.message });
    }
  } 

  static async getAllByTipoAndOrg(req, res) {
    try {
      const { tipo, organizacao_id } = req.params;
      if (!tipo ||!organizacao_id) return res.status(400).json({ error: 'Parâmetros obrigatórios não recebidos.' });

      const organizacao = await OrganizacaoService.getUsuarioOrgById(Number(organizacao_id));
      if (!organizacao) return res.status(404).json({ error: `Organização #${organizacao_id} não encontrada.` });

      const data = await ServicoService.getAllByTipoAndOrg(tipo, organizacao_id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar serviços tipo '${tipo}' da organização #${organizacao_id}:`, error);
      return res.status(500).json({ error: error.message });
    }
  } 


  static async update(req, res) {
    try {
      const { id } = req.params;
      const { updates } = req.body;
      if (!id || !updates) return res.status(400).json({ error: 'Parâmetro obrigatórios ou updates não recebidos.' });

      const servico = await ServicoService.getById(Number(id));
      if (!servico) {
        return res.status(404).json({ error: `Serviço #${id} não encontrado.` });
      }

      const atualizados = cleanObject(updates);
      const data = await ServicoService.update(Number(id), { ...servico, ...atualizados });
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao atualizar serviço #${id}:`, error);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'Parâmetro obrigatório não recebido: servico_id.' });

      const servico = await ServicoService.getById(Number(id));
      if (!servico) return res.status(404).json({ error: `Serviço #${id} não encontrado.` });
      
      await ServicoService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      console.error(`Erro ao deletar serviço #${id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = controllerServico;