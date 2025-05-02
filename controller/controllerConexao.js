const conexaoService = require('../services/conexao_service')
const Conexao = require('../model/Conexao')
const { validateConexao } = require('../validators/conexaoValidator');

const getConexoes = async (req, res) => {
    try {
        const conexaoData = await conexaoService.getAllConexao();
        const conexao = conexaoData.map(u => new Conexao({
            id: u.id,
            usuario1_id: u.usuario1_id,
            usuario2_id: u.usuario2_id,
            data_conexao: u.data_conexao,
        }))
        res.status(200).json(conexao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getConexaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await conexaoService.getConexaoById(id);
        if (!data) { return res.status(404).json({ message: "Conexão não encontrada" }); }
        const conexao = new Conexao({
            id: data.id,
            usuario1_id: data.usuario1_id,
            usuario2_id: data.usuario2_id,
            data_conexao: data.data_conexao,
        })
        res.status(200).json(conexao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createConexao = async (req, res) => {
    try {
        const validationErrors = validateConexao(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const { usuario1_id, usuario2_id } = req.body;

        const novaConexao = new Conexao({
            usuario1_id,
            usuario2_id,
        })

        const result = await conexaoService.createConexao(novaConexao);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteConexao = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await conexaoService.deleteConexao(id);

        if (!result) {
            return res.status(404).json({ message: "Conexão não encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateConexao = async (req, res) => {
    try {
        const validationErrors = validateConexao(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const { id } = req.params;
        const { usuario1_id, usuario2_id } = req.body;
        const conexaoAtualizada = new Conexao({
            id,
            usuario1_id,
            usuario2_id
        })
        const result = await conexaoService.updateConexao(id, conexaoAtualizada);
        if (!result) {
            return res.status(404).json({ message: "Conexão não encontrada" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getConexaoById, getConexoes, updateConexao, deleteConexao, createConexao };
