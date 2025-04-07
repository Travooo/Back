const eventoService = require('../services/evento_service');

const getEventos = async (req, res) => {
    try {
        const eventos = await eventoService.getAllEventos();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoService.getEventoById(id);
        if (!evento) return res.status(404).json({ message: "Evento não encontrado" });
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createEvento = async (req, res) => {
    try {
        const eventoData = req.body;
        const novoEvento = await eventoService.createEvento(eventoData);
        res.status(201).json(novoEvento);
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
        const eventoData = req.body;
        const updatedEvento = await eventoService.updateEvento(id, eventoData);
        if (!updatedEvento) return res.status(404).json({ message: "Evento não encontrado" });
        res.status(200).json(updatedEvento);
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
