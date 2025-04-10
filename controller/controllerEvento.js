const eventoService = require('../services/evento_service');
const Evento = require('../model/Evento');

const getEventos = async (req, res) => {
    try {
        const eventosData = await eventoService.getAllEventos();
        const eventos = eventosData.map(u => new Evento({
            id: u.id,
            estabelecimento_id: u.estabelecimento_id,
            organizacao_id: u.organizacao_id,
            nome: u.nome,
            data: u.data,
            descricao: u.descricao,
            created_at: u.created_at
        }))
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await eventoService.getEventoById(id);

        if (!data) return res.status(404).json({ message: "Evento não encontrado" });

        const evento = new Evento({
            id: data.id,
            estabelecimento_id: data.estabelecimento_id,
            organizacao_id: data.organizacao_id,
            nome: data.nome,
            data: data.data,
            descricao: data.descricao,
            created_at: data.created_at
        })

        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createEvento = async (req, res) => {
    try {
        const {estabelecimento_id, organizacao_id, nome, data, descricao} = req.body;

        const novoEvento = new Evento({
            estabelecimento_id,
            organizacao_id,
            nome,
            data,
            descricao,
        })

        const result = await eventoService.createEvento(novoEvento);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await eventoService.deleteEvento(id);
        if (!result) return res.status(404).json({ message: "Evento não encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            estabelecimento_id,
            organizacao_id,
            nome,
            data,
            descricao,
        } = req.body;

        const eventoAtualizado = new Evento({
            id,
            estabelecimento_id,
            organizacao_id,
            nome,
            data,
            descricao,
        })
        const result = await eventoService.updateEvento(id, eventoAtualizado);
        if (!result) return res.status(404).json({ message: "Evento não encontrado" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getEventos,
    getEventoById,
    createEvento,
    deleteEvento,
    updateEvento
};
