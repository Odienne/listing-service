import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Proposition } from "../entity/Proposition";
import { User } from "../entity/User";

class PropositionController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const propositionRepository = getRepository(Proposition);
        const propositions = await propositionRepository.find({
            select: ["id", "text"],
            relations: ["game_user_proposition"]
        });

        //Send the users object
        res.send({"propositions": propositions});
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the proposition from database
        const propositionRepository = getRepository(Proposition);
        try {
            const proposition = await propositionRepository.findOneOrFail(id, {
                select: ["id", "text"],
                relations: ["game_user_proposition"]
            });
            res.status(200).send({"proposition": proposition});
        } catch (error) {
            res.status(404).send({"error":error.message});
        }
    };

    static newProposition = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { id, text } = req.body;

        let proposition = new Proposition();

        proposition.text = text;

        //Validade if the parameters are ok
        const errors = await validate(proposition);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const propositionRepository = getRepository(Proposition);
        try {
            await propositionRepository.save(proposition);
            res.status(201).send({"proposition":proposition})
        } catch (e) {
            res.status(409).send(e.message);
            return;
        }

    };

    static editProposition = async (req: Request, res: Response) => {
        
        //Get the ID from the url
        const id = req.params.id;
        //Get values from the body
        let { text } = req.body;

        //Try to find proposition on database
        const propositionRepository = getRepository(Proposition);

        let proposition;
        try {
            proposition = await propositionRepository.findOneOrFail(id);
            await propositionRepository.save({...proposition, ...req.body });
            //After all send a 204 (no content, but accepted) response
            res.status(204).send();
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"error": error.message});
            return;
        }

    };

    static deleteProposition = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const propositionRepository = getRepository(Proposition);
        let proposition: Proposition;
        try {
            proposition = await propositionRepository.findOneOrFail(id);
            propositionRepository.delete(id);
            //After all send a 204 (no content, but accepted) response
            res.status(200).send("Proposition with id : "+id+" deleted");
        } catch (error) {
            res.status(404).send("Proposition not found");
            return;
        }
    };
};

export default PropositionController;