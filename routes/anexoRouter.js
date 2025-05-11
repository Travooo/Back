const express = require("express"); 
const upload = require('../middlewares/upload');
const AnexoController = require("../controller/AnexoController");
const anexoRouter = express.Router();

anexoRouter.post("/anexo", upload.single('arquivo'), AnexoController.upload);
anexoRouter.get("/anexo/:id", AnexoController.getById);
anexoRouter.get("/anexo", AnexoController.getAll);
anexoRouter.put("/anexo/:id", upload.single('arquivo'), AnexoController.update);
anexoRouter.delete("/anexo/:id", AnexoController.delete);

module.exports = anexoRouter;
