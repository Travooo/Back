const express = require('express');
const router = express.Router();
const controllerUsuarioOrg = require('../controller/controllerUsuarioOrganizacao');
const verificaToken = require('../middlewares/verificaToken');

router.get('/usuariosOrg', verificaToken, controllerUsuarioOrg.getUsuariosOrg);
router.get('/usuariosOrg/:id', verificaToken, controllerUsuarioOrg.getUsuarioOrgById);
router.delete('/usuariosOrg/:id', verificaToken, controllerUsuarioOrg.deleteUsuarioOrg);
router.patch('/usuariosOrg/:id', verificaToken, controllerUsuarioOrg.updateUsuarioOrg);

//rotas sem token
router.post('/usuariosOrg', controllerUsuarioOrg.createUsuarioOrg);
router.post('/usuariosOrg/login', controllerUsuarioOrg.loginUsuarioOrg);

module.exports = router;