import { Router} from "express";
import listing from "./listing";

const routes = Router();

routes.use("/", listing);


export default routes;
