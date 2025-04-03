const usuarioOrgService = require('../services/usuarioOrganizacao_service')

const getUsuariosOrg = async (req, res) => {
    try {
        const usuarioOrg = await usuarioOrgService.getAllUsuariosOrg();
        res.status(200).json(usuarioOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getUsuarioOrgById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioOrg = await usuarioOrgService.getUsuarioOrgById(id);
        if (!usuarioOrg) {
            return res.status(404).json({ message: "Usuário Organização não encontrado" });
        }
        res.status(200).json(usuarioOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createUsuarioOrg = async (req, res) => {
    try {
        const usuarioOrgData = req.body;
        const novoUsuarioOrg = await usuarioOrgService.createUsuarioOrg(usuarioOrgData);
        res.status(201).json(novoUsuarioOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteUsuarioOrg = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioOrgService.deleteUsuarioOrg(id);

        if (!result) {
            return res.status(404).json({ message: "Usuário Organização não encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateUsuarioOrg = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioOrgData = req.body;
        const updatedUsuarioOrg = await usuarioOrgService.updateUsuarioOrg(id, usuarioOrgData);
        if (!updatedUsuarioOrg) {
            return res.status(404).json({ message: "Usuário Organização não encontrado" });
        }
        res.status(200).json(updatedUsuarioOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {updateUsuarioOrg, deleteUsuarioOrg, createUsuarioOrg, getUsuarioOrgById, getUsuariosOrg};