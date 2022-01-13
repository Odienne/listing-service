import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {ConflictException} from "@nestjs/common";
import {Item} from "../entity/Item";

class ListingController {

    static getAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(Item);
        const items = await userRepository.find({
            select: ["id", "value", "type", "userId", "gameId", "createdAt", "updatedAt"]
        });

        //Send the users object
        res.send(items);
    };

    static get = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the user from database
        const userRepository = getRepository(Item);
        try {
            const item = await userRepository.findOneOrFail(id, {
                select: ["id", "value", "type", "userId", "gameId", "createdAt", "updatedAt"]
            });
            res.status(200).send({"item": item});
        } catch (error) {
            res.status(404).send({"error": error.message});
        }
    };

    static new = async (req: Request, res: Response) => {
        //Get parameters from the body
        let {
            value,
            type,
            userId,
            gameId
        } = req.body;

        let item = new Item();

        item.value = value;
        item.type = type;
        item.userId = userId;
        item.gameId = gameId;


        //Validade if the parameters are ok
        const errors = await validate(item);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const itemRepository = getRepository(Item);
        try {
            await itemRepository.save(item);

            res.status(201).send({"item": item})
        } catch (error) {
            res.status(409).send({"error": error.message});
            return;
        }

    };

    static edit = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Try to find user on database
        const itemRepository = getRepository(Item);

        let item;

        try {
            item = await itemRepository.findOneOrFail(id, {
                select: ["id", "value", "type", "userId", "gameId", "createdAt", "updatedAt"]
            });

            await itemRepository.save({...item, ...req.body});

            //After all send a 204 (no content, but accepted) response
            res.status(204).send();
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"error": error.message});
            return;
        }
    };

    static delete = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const itemRepository = getRepository(Item);
        let item: Item;
        try {
            item = await itemRepository.findOneOrFail(id);
            await itemRepository.delete(id);

            //After all send a 204 (no content, but accepted) response
            res.status(200).send("Item with id : " + id + " deleted");
        } catch (error) {
            res.status(404).send({"error": error.message});
            return;
        }
    };
};

export default ListingController;
