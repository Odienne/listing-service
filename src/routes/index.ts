import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import lobby from "./lobby";
import game from "./game";
import media from "./media";

const routes = Router();

//routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/lobbies", lobby);
routes.use("/games", game);
routes.use("/medias", media);

export default routes;