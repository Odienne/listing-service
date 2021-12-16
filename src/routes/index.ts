import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import lobby from "./lobby";
import game from "./game";
import media from "./media";
import user_game from './user_game';
import trophy from "./trophy";
import user_trophy from './user_trophy';
import proposition from "./proposition";

const routes = Router();

//routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/lobbies", lobby);
routes.use("/games", game);
routes.use("/medias", media);
routes.use("/user_game", user_game);
routes.use("/trophies", trophy);
routes.use("/user_trophy", user_trophy);
routes.use("/propositions", proposition);

export default routes;