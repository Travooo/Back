const dotenv = require('dotenv').config();
const supabase = require('../config/db');
const usuarioService = require('../services/usuario-service')

const getUsuarios = async (req, res) => {
    try {
        const usuario = await usuarioService.getAllUsuarios();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.getUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createUsuario = async (req, res) => {
    try {
        const usuarioData = req.body;
        const novoUsuario = await usuarioService.createUsuario(usuarioData);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
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
}
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioData = req.body;
        const updatedUsuario = await usuarioService.updateUsuario(id, usuarioData);
        if (!updatedUsuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getUsuarios, getUsuarioById, createUsuario, deleteUsuario, updateUsuario };