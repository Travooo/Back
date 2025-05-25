const usuarioService = require('../services/usuario_service');
const Usuario = require('../model/Usuario');
const { validateUserInput } = require('../validators/usuarioValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsuarios = async (req, res) => {
    try {
        const usuariosData = await usuarioService.getAllUsuarios();
        const usuarios = usuariosData.map(u => new Usuario({
            id: u.id,
            admin: u.admin,
            email: u.email,
            senha: u.senha,
            nome_usuario: u.nome_usuario,
            nome_completo: u.nome_completo,
            sobre: u.sobre,
            foto_perfil: u.foto_perfil,
            data_nascimento: u.data_nascimento,
            tipo_plano: u.tipo_plano,
            created_at: u.created_at
        }));
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

        const usuario = new Usuario({
            id: data.id,
            admin: data.admin,
            email: data.email,
            senha: data.senha,
            nome_usuario: data.nome_usuario,
            nome_completo: data.nome_completo,
            sobre: data.sobre,
            foto_perfil: data.foto_perfil,
            data_nascimento: data.data_nascimento,
            tipo_plano: data.tipo_plano,
            created_at: data.created_at
        });



        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {    
        if (req.body.data_nascimento?.includes('/')) {
            const [dia, mes, ano] = req.body.data_nascimento.split('/');
            req.body.data_nascimento = `${ano}-${mes}-${dia}`;
        }   

        const userData = {
            ...req.body,
            admin: false,
            tipo_plano: 1,
        };

        const validationErrors = validateUserInput(userData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const {
            admin,
            email,
            senha,
            nome_usuario,
            nome_completo,
            sobre,
            foto_perfil,
            data_nascimento,
            tipo_plano,
        } = req.body;
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = new Usuario({
            admin,
            email,
            senha: senhaCriptografada,
        });

        const usuarioCriado = await usuarioService.createUsuario(novoUsuario);

        res.status(201).json({ mensagem: 'Registro bem-sucedido', usuarioCriado });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no registro', erro: error.message });
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
        const validationErrors = validateUserInput(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
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
            tipo_plano
        } = req.body;

        const usuarioAtualizado = new Usuario({
            id,
            admin,
            email,
            senha,
            nome_usuario,
            nome_completo,
            sobre,
            foto_perfil,
            data_nascimento,
            tipo_plano
        });


        const result = await usuarioService.updateUsuario(id, usuarioAtualizado);

        if (!result) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const data = await usuarioService.getUsuarioByEmail(email);

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



module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    deleteUsuario,
    updateUsuario,
    loginUsuario,
};