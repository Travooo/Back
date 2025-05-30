const express = require('express');
const router = express.Router();
const controllerFavorito = require('../controller/controllerFavorito');
const verificaToken = require('../middlewares/verificaToken');

router.get('/favoritos', verificaToken, controllerFavorito.getFavoritos);
router.get('/favoritos/:id', verificaToken, controllerFavorito.getFavoritoById);
router.post('/favoritos', verificaToken, controllerFavorito.createFavorito);
router.delete('/favoritos/:id', verificaToken, controllerFavorito.deleteFavorito);
router.patch('/favoritos/:id', verificaToken, controllerFavorito.updateFavorito);

module.exports = router;
