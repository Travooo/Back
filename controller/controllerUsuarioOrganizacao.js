const usuarioOrgService = require('../services/usuarioOrganizacao_service')
const UsuarioOrg = require('../model/UsuarioOrganizacao')
const { validateUserOrgInput } = require('../validators/usuarioOrgValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsuariosOrg = async (req, res) => {
    try {
        const usuarioOrgData = await usuarioOrgService.getAllUsuariosOrg();
        const usuariosOrg = usuarioOrgData.map(u => new UsuarioOrg({
            id: u.id,
            cnpj: u.cnpj,
            nome_fantasia: u.nome_fantasia,
            created_at: u.created_at,
            email: u.email,
            telefone: u.telefone,
            razao_social: u.razao_social,
            senha: u.senha
        }));
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
        const usuarioOrg = new UsuarioOrg({
            id: data.id,
            cnpj: data.cnpj,
            nome_fantasia: data.nome_fantasia,
            created_at: data.created_at,
            email: data.email,
            telefone: data.telefone,
            razao_social: data.razao_social,
            senha: data.senha
        });
        res.status(200).json(usuarioOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createUsuarioOrg = async (req, res) => {
    try {
        const validationErrors = validateUserOrgInput(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const {
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha
        } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuarioOrg = new UsuarioOrg({
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha: senhaCriptografada
        });

        //verifica se email ja esta cadastrado
        const data = await usuarioOrgService.getUsuarioOrgByEmail(email);
        if (data) {
            return res.status(409).json({ mensagem: 'Email já existe' });
        }
        
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
        const validationErrors = validateUserOrgInput(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

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
        const usuarioOrgAtualizado = new UsuarioOrg({
            id,
            cnpj,
            nome_fantasia,
            created_at,
            email,
            telefone,
            razao_social,
            senha
        });
        const result = await usuarioOrgService.updateUsuarioOrg(id, usuarioOrgAtualizado);
        if (!result) {
            return res.status(404).json({ message: "Usuário Organização não encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const loginUsuarioOrg = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const data = await usuarioOrgService.getUsuarioOrgByEmail(email)

        if (!data) {
            return res.status(401).json({ mensagem: 'Email não encontrado' });
        }

        const senhaConfere = await bcrypt.compare(senha, data.senha);

        if (!senhaConfere) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { id: data.id, email: data.email, admin: data.admin },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ mensagem: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no login', erro: error.message });
    }
};

module.exports = {updateUsuarioOrg, deleteUsuarioOrg, createUsuarioOrg, getUsuarioOrgById, getUsuariosOrg, loginUsuarioOrg};