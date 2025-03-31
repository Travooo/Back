const LocalVisitadoController = require("../controllers/LocalVisitadoController");
const localVisitadoRouter = express.Router();

localVisitadoRouter.post("/", LocalVisitadoController.create);
localVisitadoRouter.get("/:id", LocalVisitadoController.get_by_id);
localVisitadoRouter.get("/", LocalVisitadoController.get_all);
localVisitadoRouter.put("/:id", LocalVisitadoController.update);
localVisitadoRouter.delete("/:id", LocalVisitadoController.delete);

module.exports = localVisitadoRouter;
