import { Router } from "express";
import LobbyController from "../controllers/LobbyController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all lobbys
//router.get("/", [checkJwt], LobbyController.listAll);
router.get("/", LobbyController.listAll);

// Get one lobby
/*router.get(
    "/:id([0-9]+)",
    [checkJwt],
    LobbyController.getOneById
);*/
router.get(
    "/:id([0-9]+)",
    LobbyController.getOneById
);

// Get one lobby
/*router.get(
    "/draftByUser/:id([0-9]+)",
    [checkJwt],
    LobbyController.getLobbyDraftByUser
);*/

//Create a new lobby
//router.post("/", [checkJwt], LobbyController.newLobby);
router.post("/", LobbyController.newLobby);

//Edit one lobby
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    LobbyController.editLobby
);*/
router.patch(
    "/:id([0-9]+)",
    LobbyController.editLobby
);

//Delete one lobby
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    LobbyController.deleteLobby
);*/
router.delete(
    "/:id([0-9]+)",
    LobbyController.deleteLobby
);

export default router;