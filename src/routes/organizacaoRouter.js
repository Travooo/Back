const OrganizacaoController = require("../controllers/OrganizacaoController");
const express = require("express");
const organizacaoRouter = express.Router();

organizacaoRouter.post("/", OrganizacaoController.create);
organizacaoRouter.get("/", OrganizacaoController.get_all);
organizacaoRouter.get("/:id", OrganizacaoController.get_by_id);
organizacaoRouter.put("/:id", OrganizacaoController.update);
organizacaoRouter.delete("/:id", OrganizacaoController.delete);

module.exports = organizacaoRouter;
