const conexaoService = require('../services/conexao_service')

const getConexoes = async (req, res) => {
    try {
        const conexao = await conexaoService.getAllConexao();
        res.status(200).json(conexao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getConexaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const conexao = await conexaoService.getConexaoById(id);
        if (!conexao) {
            return res.status(404).json({ message: "Conexão não encontrada" });
        }
        res.status(200).json(conexao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createConexao = async (req, res) => {
    try {
        const conexaoData = req.body;
        const novaConexao = await conexaoService.createConexao(conexaoData);
        res.status(201).json(novaConexao);
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
        const { id } = req.params;
        const conexaoData = req.body;
        const updatedConexao = await conexaoService.updateConexao(id, conexaoData);
        if (!updatedConexao) {
            return res.status(404).json({ message: "Conexão não encontrada" });
        }
        res.status(200).json(updatedConexao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getConexaoById, getConexoes, updateConexao, deleteConexao, createConexao };
