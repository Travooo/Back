const AgendamentoController = require("../controllers/AgendamentoController");
const agendamentoRouter = express.Router();

agendamentoRouter.post("/", AgendamentoController.create);
agendamentoRouter.get("/:id", AgendamentoController.get_by_id);
agendamentoRouter.get("/", AgendamentoController.get_all);
agendamentoRouter.put("/:id", AgendamentoController.update);
agendamentoRouter.delete("/:id", AgendamentoController.delete);

module.exports = agendamentoRouter;
