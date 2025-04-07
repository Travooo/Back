const favoritoService = require('../services/favorito_service');

const getFavoritos = async (req, res) => {
    try {
        const favorito = await favoritoService.getAllFavoritos();
        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFavoritoById = async (req, res) => {
    try {
        const { id } = req.params;
        const favorito = await favoritoService.getFavoritoById(id);
        if (!favorito) return res.status(404).json({ message: "Favorito não encontrado" });
        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createFavorito = async (req, res) => {
    try {
        const favoritoData = req.body;
        const novoFavorito = await favoritoService.createFavorito(favoritoData);
        res.status(201).json(novoFavorito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await favoritoService.deleteFavorito(id);
        if (!result) return res.status(404).json({ message: "Favorito não encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritoData = req.body;
        const updatedFavorito = await favoritoService.updateFavorito(id, favoritoData);
        if (!updatedFavorito) return res.status(404).json({ message: "Favorito não encontrado" });
        res.status(200).json(updatedFavorito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getFavoritos, getFavoritoById, createFavorito, deleteFavorito, updateFavorito };
