const cupomService = require('../services/cupom_service');

const getCupons = async (req, res) => {
    try {
        const cupom = await cupomService.getAllCupons();
        res.status(200).json(cupom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCupomById = async (req, res) => {
    try {
        const { id } = req.params;
        const cupom = await cupomService.getCupomById(id);
        if (!cupom) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }
        res.status(200).json(cupom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createCupom = async (req, res) => {
    try {
        const cupomData = req.body;
        const novoCupom = await cupomService.createCupom(cupomData);
        res.status(201).json(novoCupom);
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
        const cupomData = req.body;
        const updatedCupom = await cupomService.updateCupom(id, cupomData);
        if (!updatedCupom) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }
        res.status(200).json(updatedCupom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getCupons, getCupomById, createCupom, deleteCupom, updateCupom };
