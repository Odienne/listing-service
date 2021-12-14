import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Trophy } from "../entity/Trophy";
import { User_Trophy } from "../entity/User_Trophy";

class User_TrophyController {

    static deleteUser_Trophy = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const user_trophyRepository = getRepository(User_Trophy);
        let user_trophy: User_Trophy;
        try {
            user_trophy = await user_trophyRepository.findOneOrFail(id);
            await user_trophyRepository.delete(id);
        } catch (error) {
            res.status(404).send({error: error.message});
            return;
        }
        res.status(200).send({"message":"User_Trophy with id : "+id+" deleted"});
    }

    static editUser_Trophy = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        let { obtention_date, userId, trophyId } = req.body;

        const userRepository = getRepository(User);

        const trophyRepository = getRepository(Trophy);

        const user_trophyRepository = getRepository(User_Trophy);


        try {

            const user_trophy = await user_trophyRepository.findOneOrFail(id);

            const user = await userRepository.findOneOrFail(userId);

            const trophy = await trophyRepository.findOneOrFail(trophyId);

            user_trophy.obtention_date = obtention_date;
            user_trophy.user = user;
            user_trophy.trophy = trophy;

            const errors = await validate(user_trophy);
            if (errors.length > 0) {
                throw errors;
            }

            await trophyRepository.save({...user_trophy, ...req.body });

            res.status(200).send(user_trophy);

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send(error);
            return;
        }

    };

    static getOneById = async (req: Request, res: Response) => {
        
        const id: number = parseInt(req.params.id);

        const user_trophyRepository = getRepository(User_Trophy);
        try {
            const user_trophy = await user_trophyRepository.findOneOrFail(id, {
                select: ["id", "obtention_date", "createdAt", "updatedAt"],
                relations: ["user", "trophy"] //We dont want to send the password on response
            });            
            res.status(200).send(user_trophy);
        } catch (error) {
            res.status(404).send("TrophyUser not found");
            return
        }        
    };

};

export default User_TrophyController;
