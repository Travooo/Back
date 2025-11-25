const favoritoService = require('../services/favorito_service');
const Favorito = require('../model/Favorito')
const {validateFavorito} = require('../validators/favoritoValidator');

/**
 * GET /favoritos
 * Retorna os serviços favoritados do usuário autenticado
 * O usuario_id é extraído do token JWT (req.usuario.id)
 */
const getFavoritos = async (req, res) => {
    try {
        // Extrai o usuario_id do token JWT
        const usuarioId = req.usuario?.id;
        
        if (!usuarioId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        // Busca os favoritos do usuário com join em servicos
        const servicos = await favoritoService.getFavoritosByUsuarioId(usuarioId);
        
        res.status(200).json(servicos);
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

/**
 * POST /favoritos/:servicoId
 * Adiciona um favorito para o usuário autenticado
 * O usuario_id é extraído do token JWT (req.usuario.id)
 * O estabelecimento_id vem do parâmetro servicoId no path
 */
const createFavorito = async (req, res) => {
    try {
        // Extrai o usuario_id do token JWT
        const usuarioId = req.usuario?.id;
        
        if (!usuarioId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        // O servicoId vem do path (estabelecimento_id)
        const servicoId = parseInt(req.params.servicoId);
        
        if (!servicoId || isNaN(servicoId)) {
            return res.status(400).json({ error: 'ID do serviço inválido' });
        }

        // Verifica se o favorito já existe
        const existe = await favoritoService.favoritoExiste(usuarioId, servicoId);
        if (existe) {
            return res.status(409).json({ error: 'Favorito já existe' });
        }

        // Cria o favorito
        const result = await favoritoService.criarFavorito(usuarioId, servicoId);
        res.status(201).json({ message: 'Favorito adicionado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * DELETE /favoritos/:servicoId
 * Remove um favorito do usuário autenticado
 * O usuario_id é extraído do token JWT (req.usuario.id)
 * O estabelecimento_id vem do parâmetro servicoId no path
 */
const deleteFavorito = async (req, res) => {
    try {
        // Extrai o usuario_id do token JWT
        const usuarioId = req.usuario?.id;
        
        if (!usuarioId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        // O servicoId vem do path (estabelecimento_id)
        const servicoId = parseInt(req.params.servicoId);
        
        if (!servicoId || isNaN(servicoId)) {
            return res.status(400).json({ error: 'ID do serviço inválido' });
        }

        // Remove o favorito
        const result = await favoritoService.removerFavorito(usuarioId, servicoId);
        if (!result) {
            return res.status(404).json({ message: "Favorito não encontrado" });
        }
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
