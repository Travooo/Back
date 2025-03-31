const FavoritoController = require("../controllers/FavoritoController");
const favoritoRouter = express.Router();

favoritoRouter.post("/", FavoritoController.create);
favoritoRouter.get("/:id", FavoritoController.get_by_id);
favoritoRouter.get("/", FavoritoController.get_all);
favoritoRouter.put("/:id", FavoritoController.update);
favoritoRouter.delete("/:id", FavoritoController.delete);

module.exports = favoritoRouter;
