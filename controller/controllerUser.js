const usuarioService = require('../services/usuario_service');
const Usuario = require('../model/Usuario');

const getUsuarios = async (req, res) => {
    try {
        const usuariosData = await usuarioService.getAllUsuarios();
        const usuarios = usuariosData.map(u => new Usuario(
            u.id,
            u.admin,
            u.email,
            u.senha,
            u.nome_usuario,
            u.nome_completo,
            u.sobre,
            u.foto_perfil,
            u.data_nascimento,
            u.created_at,
            u.tipo_plano
        ));
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await usuarioService.getUsuarioById(id);

        if (!data) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const usuario = new Usuario(
            data.id,
            data.admin,
            data.email,
            data.senha,
            data.nome_usuario,
            data.nome_completo,
            data.sobre,
            data.foto_perfil,
            data.data_nascimento,
            data.created_at,
            data.tipo_plano
        );

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const {
            admin,
            email,
            senha,
            nome_usuario,
            nome_completo,
            sobre,
            foto_perfil,
            data_nascimento,
            created_at,
            tipo_plano
        } = req.body;

        const novoUsuario = new Usuario(
            null,
            admin,
            email,
            senha,
            nome_usuario,
            nome_completo,
            sobre,
            foto_perfil,
            data_nascimento,
            created_at,
            tipo_plano
        );

        const result = await usuarioService.createUsuario(novoUsuario);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usuarioService.deleteUsuario(id);

        if (!result) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            admin,
            email,
            senha,
            nome_usuario,
            nome_completo,
            sobre,
            foto_perfil,
            data_nascimento,
            created_at,
            tipo_plano
        } = req.body;

        const usuarioAtualizado = new Usuario(
            id,
            admin,
            email,
            senha,
            nome_usuario,
            nome_completo,
            sobre,
            foto_perfil,
            data_nascimento,
            created_at,
            tipo_plano
        );

        const result = await usuarioService.updateUsuario(id, usuarioAtualizado);

        if (!result) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    deleteUsuario,
    updateUsuario
};