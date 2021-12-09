import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import lobby from "./lobby";

const routes = Router();

//routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/lobby", lobby)

export default routes;