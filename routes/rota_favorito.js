const express = require('express');
const router = express.Router();
const controllerFavorito = require('../controller/controllerFavorito');
const verificaToken = require('../middlewares/verificaToken');

// GET /favoritos - Lista favoritos do usuário autenticado (retorna serviços)
router.get('/favoritos', verificaToken, controllerFavorito.getFavoritos);

// POST /favoritos/:servicoId - Adiciona favorito (servicoId = estabelecimento_id)
router.post('/favoritos/:servicoId', verificaToken, controllerFavorito.createFavorito);

// DELETE /favoritos/:servicoId - Remove favorito (servicoId = estabelecimento_id)
router.delete('/favoritos/:servicoId', verificaToken, controllerFavorito.deleteFavorito);

// Rotas antigas mantidas para compatibilidade (se necessário)
router.get('/favoritos/:id', verificaToken, controllerFavorito.getFavoritoById);
router.patch('/favoritos/:id', verificaToken, controllerFavorito.updateFavorito);

module.exports = router;
