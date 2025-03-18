// TODO: Revisar este arquivo - gerado por IA. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/usuario-controller");

router.get("/", controllerUser.hello);
router.get("/hello/:nome", controllerUser.helloParam);
router.get("/users", controllerUser.getUsers);

module.exports = router;
