const express = require("express");
const router = express.Router();

router.post("/", UsuarioController.create);
router.get("/", UsuarioController.get_all);
router.get("/:id", UsuarioController.get_by_id);
router.put("/:id", UsuarioController.update);
router.delete("/:id", UsuarioController.delete);

module.exports = router;
