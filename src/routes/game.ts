import { Router } from "express";
import GameController from "../controllers/GameController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all lobbys
//router.get("/", [checkJwt], GameController.listAll);
router.get("/", GameController.listAll);

// Get one lobby
/*router.get(
    "/:id([0-9]+)",
    [checkJwt],
    GameController.getOneById
);*/
router.get(
    "/:id([0-9]+)",
    GameController.getOneById
);

// Get one lobby
/*router.get(
    "/draftByUser/:id([0-9]+)",
    [checkJwt],
    GameController.getGameDraftByUser
);*/

//Create a new lobby
//router.post("/", [checkJwt], GameController.newGame);
router.post("/", GameController.newGame);

//Edit one lobby
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    GameController.editGame
);*/
router.patch(
    "/:id([0-9]+)",
    GameController.editGame
);

//Delete one lobby
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    GameController.deleteGame
);*/
router.delete(
    "/:id([0-9]+)",
    GameController.deleteGame
);

export default router;