const notificacaoService = require('../services/notificacao_service');
const Notificacao = require('../model/Notificacao');

const getNotificacoes = async (req, res) => {
    try {
        const data = await notificacaoService.getAllNotificacoes();
        const notificacao = data.map(u => new Notificacao({
            id: u.id,
            titulo: u.titulo,
            descricao: u.descricao,
            usuario_id: u.usuario_id,
            created_at: u.created_at
        }))
        res.status(200).json(notificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getNotificacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await notificacaoService.getNotificacaoById(id);
        if (!data) return res.status(404).json({ message: "Notificação não encontrada" });
        const noficacao = new Notificacao({
            id: data.id,
            titulo: data.titulo,
            descricao: data.descricao,
            usuario_id: data.usuario_id,
            created_at: data.created_at
        })
        res.status(200).json(noficacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createNotificacao = async (req, res) => {
    try {
        const { titulo, descricao, usuario_id} = req.body;

        const novaNotificacao = new Notificacao({
            titulo,
            descricao,
            usuario_id
        })

        const result = await notificacaoService.createNotificacao(novaNotificacao);
        res.status(201).json(result);
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
        const { titulo, descricao, usuario_id} = req.body;
        const notificacaoAtualizada = new Notificacao({
            titulo,
            descricao,
            usuario_id
        })
        const result = await notificacaoService.updateNotificacao(id, notificacaoAtualizada);
        if (!result) return res.status(404).json({ message: "Notificação não encontrada" });
        res.status(200).json(result);
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
