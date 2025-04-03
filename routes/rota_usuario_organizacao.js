const express = require('express');
const router = express.Router();
const controllerUsuarioOrg = require('../controller/controllerUsuarioOrganizacao');

router.get('/usuariosOrg', controllerUsuarioOrg.getUsuariosOrg);
router.get('/usuariosOrg/:id',controllerUsuarioOrg.getUsuarioOrgById);
router.post('/usuariosOrg', controllerUsuarioOrg.createUsuarioOrg);
router.delete('/usuariosOrg/:id', controllerUsuarioOrg.deleteUsuarioOrg);
router.patch('/usuariosOrg/:id', controllerUsuarioOrg.updateUsuarioOrg);

module.exports = router;