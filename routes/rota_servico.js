const express = require("express");
const controllerServico = require("../controller/controllerServico");
const verificaToken = require('../middlewares/verificaToken');
const router = express.Router();

router.post("/servicos", verificaToken, controllerServico.create);
router.get("/servicos", verificaToken, controllerServico.getAll);
router.get("/servicos/:id", verificaToken, controllerServico.getById);
router.get("/servicos/tipo/:tipo", verificaToken, controllerServico.getAllByTipo);
router.get("/servicos/organizacao/:organizacao_id", verificaToken, controllerServico.getAllByOrg);
router.get("/servicos/tipo/:tipo/organizacao/:organizacao_id", verificaToken, controllerServico.getAllByTipoAndOrg);
router.put("/servicos/:id", verificaToken, controllerServico.update);
router.delete("/servicos/:id", verificaToken, controllerServico.delete);

module.exports = router;