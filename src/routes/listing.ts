import { Router } from "express";
import ListingController from "../controllers/ListingController";

const router = Router();

//GET all items
router.get('/', ListingController.getAll)
//GET one item by its id
router.get("/:id([0-9]+)", ListingController.get);
//CREATE a new item
router.post("/", ListingController.new);
//Edit one item
router.patch("/:id([0-9]+)", ListingController.edit);
//Delete one item
router.delete("/:id([0-9]+)", ListingController.delete);

export default router;
