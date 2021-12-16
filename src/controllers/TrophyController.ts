import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Trophy } from "../entity/Trophy";

class TrophyController {

    static listAll = async (req: Request, res: Response) => {

        const trophyRepository = getRepository(Trophy);
        const trophys = await trophyRepository.find({
            select: ["id", "name", "icon", "description", "createdAt", "updatedAt"],
            relations: ["user_trophy"]
        });

        res.send({"trophies": trophys});
    };

    static getOneById = async (req: Request, res: Response) => {
        
        const id: number = parseInt(req.params.id);

        const trophyRepository = getRepository(Trophy);
        try {
            const trophy = await trophyRepository.findOneOrFail(id, {
                select: ["id", "name", "icon", "description", "createdAt", "updatedAt"],
                relations: ["user_trophy"]
            });            
            res.status(200).send({"trophy": trophy});
        } catch (error) {
            res.status(404).send({"error": error.message});
            return
        }        
    };

    static newTrophy = async (req: Request, res: Response) => {

        //Get parameters from the body
        let { name, icon, description } = req.body;
        let trophy = new Trophy();
        
        trophy.name = name;
        trophy.icon = icon;
        trophy.description = description;     

        //Validade if the parameters are ok
        const errors = await validate(trophy);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const trophyRepository = getRepository(Trophy);
        try {
            await trophyRepository.save(trophy);
            //If all ok, send 201 response
            res.status(201).send({"trophy":trophy});
        } catch (e) {
            res.status(409).send("Trophy reference already in use");
            return;
        }

    };

    static editTrophy = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { name, icon, description } = req.body;

        //Try to find user on database
        const trophyRepository = getRepository(Trophy);
        try {

            const trophy = await trophyRepository.findOneOrFail(id);

            await trophyRepository.save({...trophy, ...req.body });

            res.status(204).send();

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send(error);
            return;
        }

    };

    static deleteTrophy = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const trophyRepository = getRepository(Trophy);
        let trophy: Trophy;
        try {
            trophy = await trophyRepository.findOneOrFail(id);
            trophyRepository.delete(id);
            //After all send a 204 (no content, but accepted) response
            res.status(200).send("Trophy with id : "+id+" deleted");
        } catch (error) {
            res.status(404).send({"error": error});
            return;
        }

    };
    
};

export default TrophyController;