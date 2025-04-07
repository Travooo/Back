const notificacaoService = require('../services/notificacao_service');

const getNotificacoes = async (req, res) => {
    try {
        const notificacoes = await notificacaoService.getAllNotificacoes();
        res.status(200).json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getNotificacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacao = await notificacaoService.getNotificacaoById(id);
        if (!notificacao) return res.status(404).json({ message: "Notificação não encontrada" });
        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createNotificacao = async (req, res) => {
    try {
        const notificacaoData = req.body;
        const novaNotificacao = await notificacaoService.createNotificacao(notificacaoData);
        res.status(201).json(novaNotificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteNotificacao = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await notificacaoService.deleteNotificacao(id);
        if (!result) return res.status(404).json({ message: "Notificação não encontrada" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateNotificacao = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacaoData = req.body;
        const updatedNotificacao = await notificacaoService.updateNotificacao(id, notificacaoData);
        if (!updatedNotificacao) return res.status(404).json({ message: "Notificação não encontrada" });
        res.status(200).json(updatedNotificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getNotificacoes,
    getNotificacaoById,
    createNotificacao,
    deleteNotificacao,
    updateNotificacao
};
