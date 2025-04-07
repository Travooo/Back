const usuarioOrgService = require('../services/usuarioOrganizacao_service')
const UsuarioOrg = require('../model/UsuarioOrganizacao')

const getUsuariosOrg = async (req, res) => {
    try {
        const usuarioOrgData = await usuarioOrgService.getAllUsuariosOrg();
        const usuariosOrg = usuarioOrgData.map(u => new UsuarioOrg(
            u.id,
            u.cnpj,
            u.nome_fantasia,
            u.created_at,
            u.email,
            u.telefone,
            u.razao_social,
            u.senha
        ));
        res.status(200).json(usuariosOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getUsuarioOrgById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await usuarioOrgService.getUsuarioOrgById(id);
        if (!data) {
            return res.status(404).json({ message: "Usuário Organização não encontrado" });
        }
        const usuarioOrg = new UsuarioOrg(
            data.id,
            data.cnpj,
            data.nome_fantasia,
            data.created_at,
            data.email,
            data.telefone,
            data.razao_social,
            data.senha
        );
        res.status(200).json(usuarioOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createUsuarioOrg = async (req, res) => {
    try {
        const {
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha
        } = req.body;
        const novoUsuarioOrg = new UsuarioOrg(
            null,
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha
        );
        
        const result = await usuarioOrgService.createUsuarioOrg(novoUsuarioOrg);
        res.status(201).json(result);
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
        const {
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha
        } = req.body;
        const usuarioOrgAtualizado = new UsuarioOrg(
            id,
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha
        );
        const result = await usuarioOrgService.updateUsuarioOrg(id, usuarioOrgAtualizado);
        if (!result) {
            return res.status(404).json({ message: "Usuário Organização não encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {updateUsuarioOrg, deleteUsuarioOrg, createUsuarioOrg, getUsuarioOrgById, getUsuariosOrg};