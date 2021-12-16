import { Router } from "express";
import TrophyController from "../controllers/TrophyController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all lobbys
//router.get("/", [checkJwt], TrophyController.listAll);
router.get("/", TrophyController.listAll);

// Get one lobby
/*router.get(
    "/:id([0-9]+)",
    [checkJwt],
    TrophyController.getOneById
);*/
router.get(
    "/:id([0-9]+)",
    TrophyController.getOneById
);

// Get one lobby
/*router.get(
    "/draftByUser/:id([0-9]+)",
    [checkJwt],
    TrophyController.getTrophyDraftByUser
);*/

//Create a new lobby
//router.post("/", [checkJwt], TrophyController.newTrophy);
router.post("/", TrophyController.newTrophy);

//Edit one lobby
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    TrophyController.editTrophy
);*/
router.patch(
    "/:id([0-9]+)",
    TrophyController.editTrophy
);

//Delete one lobby
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    TrophyController.deleteTrophy
);*/
router.delete(
    "/:id([0-9]+)",
    TrophyController.deleteTrophy
);

export default router;