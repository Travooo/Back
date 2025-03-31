const CupomController = require("../controllers/CupomController");
const cupomRouter = express.Router();

cupomRouter.post("/", CupomController.create);
cupomRouter.get("/:id", CupomController.get_by_id);
cupomRouter.get("/", CupomController.get_all);
cupomRouter.put("/:id", CupomController.update);
cupomRouter.delete("/:id", CupomController.delete);

module.exports = cupomRouter;
