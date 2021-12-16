import { Router } from "express";
import PropositionController from "../controllers/PropositionController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all lobbys
//router.get("/", [checkJwt], PropositionController.listAll);
router.get("/", PropositionController.listAll);

// Get one lobby
/*router.get(
    "/:id([0-9]+)",
    [checkJwt],
    PropositionController.getOneById
);*/
router.get(
    "/:id([0-9]+)",
    PropositionController.getOneById
);

// Get one lobby
/*router.get(
    "/draftByUser/:id([0-9]+)",
    [checkJwt],
    PropositionController.getPropositionDraftByUser
);*/

//Create a new lobby
//router.post("/", [checkJwt], PropositionController.newProposition);
router.post("/", PropositionController.newProposition);

//Edit one lobby
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    PropositionController.editProposition
);*/
router.patch(
    "/:id([0-9]+)",
    PropositionController.editProposition
);

//Delete one lobby
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    PropositionController.deleteProposition
);*/
router.delete(
    "/:id([0-9]+)",
    PropositionController.deleteProposition
);

export default router;