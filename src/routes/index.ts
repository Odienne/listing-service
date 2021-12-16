import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import lobby from "./lobby";
import game from "./game";
<<<<<<< HEAD
import media from "./media";
=======
import user_game from './user_game';
import trophy from "./trophy";
import user_trophy from './user_trophy';
>>>>>>> e698bfab9c92369ee90462705153c1eaaec4aef1

const routes = Router();

//routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/lobbies", lobby);
routes.use("/games", game);
<<<<<<< HEAD
routes.use("/medias", media);
=======
routes.use("/user_game", user_game);
routes.use("/trophies", trophy);
routes.use("/user_trophy", user_trophy);
>>>>>>> e698bfab9c92369ee90462705153c1eaaec4aef1

export default routes;