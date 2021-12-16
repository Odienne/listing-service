import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Game } from "../entity/Game";
import { User_Game } from "../entity/User_Game";

class User_GameController {

    static deleteUser_Game = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const user_gameRepository = getRepository(User_Game);
        let user_game: User_Game;
        try {
            user_game = await user_gameRepository.findOneOrFail(id);
            await user_gameRepository.delete(id);
            res.status(200).send({"message":"GameUser with id : "+id+" deleted"});
        } catch (error) {
            res.status(404).send({error: error.message});
            return;
        }
    }

    static editUser_Game = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        let { score, userId, gameId } = req.body;

        const userRepository = getRepository(User);

        const gameRepository = getRepository(Game);

        const user_gameRepository = getRepository(User_Game);


        try {

            const user_game = await user_gameRepository.findOneOrFail(id);

            const user = await userRepository.findOneOrFail(userId);

            const game = await gameRepository.findOneOrFail(gameId);

            user_game.score = score;
            user_game.user = user;
            user_game.game = game;

            const errors = await validate(user_game);
            if (errors.length > 0) {
                throw errors;
            }

            await gameRepository.save({...user_game, ...req.body });

            res.status(204).send();

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send(error);
            return;
        }

    };

    static getOneById = async (req: Request, res: Response) => {
        
        const id: number = parseInt(req.params.id);

        const user_gameRepository = getRepository(User_Game);
        try {
            const user_game = await user_gameRepository.findOneOrFail(id, {
                select: ["id", "score", "createdAt", "updatedAt"],
                relations: ["user", "game", "game_user_proposition"] //We dont want to send the password on response
            });            
            res.status(200).send({"User_Game": user_game});
        } catch (error) {
            res.status(404).send({"error": error.message});
            return
        }        
    };

};

export default User_GameController;
