import { Router } from "express";
import User_TrophyController from "../controllers/User_TrophyController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// Get one user
/*router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    User_TrophyController.getOneById
);*/
router.get("/:id([0-9]+)", User_TrophyController.getOneById);

//Edit one user
/*router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    User_TrophyController.editUser
);*/
router.patch("/:id([0-9]+)", User_TrophyController.editUser_Trophy);

//Delete one user
/*router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    User_TrophyController.deleteUser
);*/
router.delete("/:id([0-9]+)", User_TrophyController.deleteUser_Trophy);

export default router;