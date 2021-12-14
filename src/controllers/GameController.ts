import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Game } from "../entity/Game";
import { User } from "../entity/User";
import { User_Game } from "../entity/User_Game";
import { ConflictException } from "@nestjs/common";

class GameController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const gameRepository = getRepository(Game);
        const games = await gameRepository.find({
            select: ["id", "name", "description", "status", "tour", "createdAt", "updatedAt"],
            relations: ["juge", "user_game"]
        });

        //Send the users object
        res.send(games);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);
        //Get the game from database
        const gameRepository = getRepository(Game);
        try {
            const game = await gameRepository.findOneOrFail(id, {
                select: ["id", "name", "description", "status", "tour", "createdAt", "updatedAt"],
                relations: ["juge", "user_game"]
            });
            res.status(200).send(game);
        } catch (error) {
            res.status(404).send({"error" : error.message});
        }
    };

    static newGame = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { id, name, description, status, tour } = req.body;

        let game = new Game();

        game.name = name;
        game.description = description;
        game.status = status;
        game.tour = tour;

        //Validade if the parameters are ok
        const errors = await validate(game);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const gameRepository = getRepository(Game);
        try {
            await gameRepository.save(game);
        } catch (error) {
            res.status(409).send({"error": error.message});
            return;
        }

        res.status(201).send({"game":game})

    };

    static editGame = async (req: Request, res: Response) => {
        
        //Get the ID from the url
        const id = req.params.id;
        //Get values from the body
        let { name, description, status, tour, idJuge, idUser } = req.body;

        //Try to find game on database
        const gameRepository = getRepository(Game);
        const userRepository = getRepository(User);
        const user_gameRepository = getRepository(User_Game);

        let game;
        try {
            game = await gameRepository.findOneOrFail(id, {
                select: ["id", "name", "description", "status", "tour"],
                relations: ["juge", "user_game"]
            });
            if(idJuge){
                game.juge = await userRepository.findOneOrFail(idJuge);
            }
    
            if(idUser){

                var result = game.user_game.filter(user_game => user_game.user.id == idUser);

                if(result.length != 0){
                    throw new ConflictException('User_Game already exist');
                }
                
                let user_game = new User_Game();
                user_game.user = await userRepository.findOneOrFail(idUser);
                user_game.game = game;
                user_game.score = 0;
                user_gameRepository.save(user_game)
            }
            await gameRepository.save({...game, ...req.body });

            res.status(204).send();

        } catch (error: any) {
            res.status(422).send({"error":error.message});
        }
    };

    static deleteGame = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const gameRepository = getRepository(Game);
        let game: Game;
        try {
            game = await gameRepository.findOneOrFail(id);
            gameRepository.delete(id);
        } catch (error) {
            res.status(404).send({"error": error.message});
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(200).send("Game with id : "+id+" deleted");
    };
};

export default GameController;