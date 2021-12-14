import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import lobby from "./lobby";
import game from "./game";
import user_game from './user_game';
import trophy from "./trophy";
import user_trophy from './user_trophy';

const routes = Router();

//routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/lobbies", lobby);
routes.use("/games", game);
routes.use("/user_game", user_game);
routes.use("/trophies", trophy);
routes.use("/user_trophy", user_trophy);

export default routes;