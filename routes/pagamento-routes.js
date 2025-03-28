const express = require("express");
const PagamentoController = require("../controllers/pagamento-controller");
const router = express.Router();

// Criar um novo pagamento
router.post("/", PagamentoController.create);

// Obter um pagamento por ID
router.get("/:id", PagamentoController.get_by_id);

// Obter todos os pagamentos
router.get("/", PagamentoController.get_all);

// Obter status de um pagamento por ID
router.get("/:id/status", PagamentoController.get_status);

// Atualizar status de um pagamento
router.put("/:id/status", PagamentoController.update_status);

// Deletar um pagamento por ID
router.delete("/:id", PagamentoController.delete);

module.exports = router;
