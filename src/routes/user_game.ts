import { Router } from "express";
import User_GameController from "../controllers/User_GameController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Get one user
/*router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    User_GameController.getOneById
);*/
router.get("/:id([0-9]+)", User_GameController.getOneById);

//Edit one user
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    User_GameController.editUser
);*/
router.patch("/:id([0-9]+)", User_GameController.editUser_Game);

//Delete one user
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    User_GameController.deleteUser
);*/
router.delete("/:id([0-9]+)", User_GameController.deleteUser_Game);

export default router;