const express = require("express");
const controllerServico = require("../controller/controllerServico");
const router = express.Router();
const verificaToken = require('../middlewares/verificaToken');

router.post("/servicos", verificaToken, controllerServico.create);
router.get("/servicos/:id", verificaToken, controllerServico.getById);
router.get("/servicos", verificaToken, controllerServico.getAll);
router.get("/servicos/tipo/:tipo", verificaToken, controllerServico.getByTipo);
router.put("/servicos/:id", verificaToken, controllerServico.update);
router.delete("/servicos/:id", verificaToken, controllerServico.delete);

module.exports = router;
