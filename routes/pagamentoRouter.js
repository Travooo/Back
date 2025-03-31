const PagamentoController = require("../controllers/pagamentoController");
const pagamentoRouter = express.Router();

pagamentoRouter.post("/", PagamentoController.create);
pagamentoRouter.get("/:id", PagamentoController.get_by_id);
pagamentoRouter.get("/", PagamentoController.get_all);
pagamentoRouter.get("/:id/status", PagamentoController.get_status);
pagamentoRouter.put("/:id/status", PagamentoController.update_status);
pagamentoRouter.delete("/:id", PagamentoController.delete);

module.exports = pagamentoRouter;
