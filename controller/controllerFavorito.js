const favoritoService = require('../services/favorito_service');
const Favorito = require('../model/Favorito')
const {validateFavorito} = require('../validators/favoritoValidator');

const getFavoritos = async (req, res) => {
    try {
        const data = await favoritoService.getAllFavoritos();
        const favorito = data.map(u => new Favorito({
            id: u.id,
            estabelecimento_id: u.estabelecimento_id,
            usuario_id: u.usuario_id,
            created_at: u.created_at
        }))
        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFavoritoById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await favoritoService.getFavoritoById(id);
        if (!data) return res.status(404).json({ message: "Favorito não encontrado" });
        const favorito = new Favorito({
            id: data.id,
            estabelecimento_id: data.estabelecimento_id,
            usuario_id: data.usuario_id,
            created_at: data.created_at
        })
        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createFavorito = async (req, res) => {
    try {
        const validationErrors = validateFavorito(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const {estabelecimento_id, usuario_id} = req.body;
        const novoFavorito = new Favorito({
            estabelecimento_id, 
            usuario_id, 
        })
        const result = await favoritoService.createFavorito(novoFavorito);
        res.status(201).json(result);
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
        const validationErrors = validateFavorito(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const { id } = req.params;
        const {estabelecimento_id, usuario_id} = req.body;
        const favoritoAtualizado = new Favorito({
            estabelecimento_id, 
            usuario_id, 
        })
        const result = await favoritoService.updateFavorito(id, favoritoAtualizado);
        if (!result) return res.status(404).json({ message: "Favorito não encontrado" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getFavoritos, getFavoritoById, createFavorito, deleteFavorito, updateFavorito };
