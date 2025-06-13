const express = require('express'); 
const upload = require('../middlewares/upload');
const controllerAnexo = require('../controller/controllerAnexo');
const verificaToken = require('../middlewares/verificaToken');
const rota_anexo = express.Router();

// Upload de anexo
rota_anexo.post('/anexos', verificaToken, upload.single('file'), controllerAnexo.upload);

// Obter anexo por ID
rota_anexo.get('/anexos/:anexo_id', verificaToken, controllerAnexo.getById);

// Obter galeria do local
rota_anexo.get('/anexos/galeria/:entidade_tipo/:entidade_id', verificaToken, controllerAnexo.getGaleria);

// Obter foto de perfil do local
rota_anexo.get('/anexos/perfil/:entidade_tipo/:entidade_id', verificaToken, controllerAnexo.getProfilePic);

// Definir nova foto de perfil ao local
rota_anexo.post('/anexos/perfil/:entidade_tipo/:entidade_id', verificaToken, upload.single('file'), controllerAnexo.setProfilePic);

// Remover anexo por ID
rota_anexo.delete('/anexos/:anexo_id', verificaToken, controllerAnexo.deleteById);

module.exports = rota_anexo;
