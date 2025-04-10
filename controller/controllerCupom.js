const cupomService = require('../services/cupom_service');
const Cupom = require('../model/Cupom');

const getCupons = async (req, res) => {
    try {
        const data = await cupomService.getAllCupons();
        const cupom = data.map(u => new Cupom({
            id: u.id,
            estabelecimento_id: u.estabelecimento_id,
            usuario_id: u.usuario_id,
            descricao: u.descricao,
            created_at: u.created_at
        }))
        res.status(200).json(cupom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCupomById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await cupomService.getCupomById(id);
        if (!data) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }
        const cupom = new Cupom({
            id: data.id,
            estabelecimento_id: data.estabelecimento_id,
            usuario_id: data.usuario_id,
            descricao: data.descricao,
            created_at: data.created_at
        })
        res.status(200).json(cupom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createCupom = async (req, res) => {
    try {
        const {estabelecimento_id, usuario_id, descricao} = req.body;
        const novoCupom = new Cupom({
            estabelecimento_id, 
            usuario_id, 
            descricao
        })
        const result = await cupomService.createCupom(novoCupom);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCupom = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cupomService.deleteCupom(id);

        if (!result) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCupom = async (req, res) => {
    try {
        const { id } = req.params;
        const {estabelecimento_id, usuario_id, descricao} = req.body;
        const cupomAtualizado = new Cupom({
            estabelecimento_id, 
            usuario_id, 
            descricao
        })
        const result = await cupomService.updateCupom(id, cupomAtualizado);
        if (!result) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getCupons, getCupomById, createCupom, deleteCupom, updateCupom };
