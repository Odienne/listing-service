import { Router } from "express";
import MediaController from "../controllers/MediaController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all lobbys
//router.get("/", [checkJwt], MediaController.listAll);
router.get("/", MediaController.listAll);

// Get one lobby
/*router.get(
    "/:id([0-9]+)",
    [checkJwt],
    MediaController.getOneById
);*/
router.get(
    "/:id([0-9]+)",
    MediaController.getOneById
);

// Get one lobby
/*router.get(
    "/draftByUser/:id([0-9]+)",
    [checkJwt],
    MediaController.getMediaDraftByUser
);*/

//Create a new lobby
//router.post("/", [checkJwt], MediaController.newMedia);
router.post("/", MediaController.newMedia);

//Edit one lobby
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    MediaController.editMedia
);*/
router.patch(
    "/:id([0-9]+)",
    MediaController.editMedia
);

//Delete one lobby
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    MediaController.deleteMedia
);*/
router.delete(
    "/:id([0-9]+)",
    MediaController.deleteMedia
);

export default router;