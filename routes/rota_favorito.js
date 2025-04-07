const express = require('express');
const router = express.Router();
const controllerFavorito = require('../controller/controllerFavorito');

router.get('/favoritos', controllerFavorito.getFavoritos);
router.get('/favoritos/:id', controllerFavorito.getFavoritoById);
router.post('/favoritos', controllerFavorito.createFavorito);
router.delete('/favoritos/:id', controllerFavorito.deleteFavorito);
router.patch('/favoritos/:id', controllerFavorito.updateFavorito);

module.exports = router;
