const express = require("express");
const controllerServico = require("../controller/controllerServico");
const router = express.Router();

router.post("/servicos", controllerServico.create);
router.get("/servicos/:id", controllerServico.getById);
router.get("/servicos", controllerServico.getAll);
router.get("/servicos/tipo/:tipo", controllerServico.getByTipo);
router.put("/servicos/:id", controllerServico.update);
router.delete("/servicos/:id", controllerServico.delete);

module.exports = router;
