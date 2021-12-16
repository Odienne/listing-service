import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Game } from "../entity/Game";
import { User } from "../entity/User";
import { Media } from "../entity/Media";
import { User_Game } from "../entity/User_Game";
import { ConflictException } from "@nestjs/common";
import { Game_User_Proposition } from "../entity/Game_User_Proposition";
import { Proposition } from "../entity/Proposition";

class GameController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const gameRepository = getRepository(Game);
        const games = await gameRepository.find({
            select: ["id", "name", "description", "status", "tour", "createdAt", "updatedAt"],
            relations: ["juge", "user_game", "user_game.game_user_proposition", "media"]
        });

        //Send the users object
        res.send({"games":games});
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);
        //Get the game from database
        const gameRepository = getRepository(Game);
        try {
            const game = await gameRepository.findOneOrFail(id, {
                select: ["id", "name", "description", "status", "tour", "createdAt", "updatedAt"],
                relations: ["juge", "user_game", "user_game.game_user_proposition", "media"]
            });
            res.status(200).send({"game": game});
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
             res.status(201).send({"game":game})
        } catch (error) {
            res.status(409).send({"error": error.message});
            return;
        }

    };

    static editGame = async (req: Request, res: Response) => {
        
        //Get the ID from the url
        const id = req.params.id;
        //Get values from the body
        let { name, description, statut, tour, idJuge, idUser, idMedia, idUserGame, idProposition } = req.body;

        //Try to find game on database
        const gameRepository = getRepository(Game);
        const userRepository = getRepository(User);
        const mediaRepository = getRepository(Media);
        const user_gameRepository = getRepository(User_Game);
        const propositionRepository = getRepository(Proposition);
        const game_user_propositionRepository = getRepository(Game_User_Proposition);

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
            if(idMedia){
                game.media = await mediaRepository.findOneOrFail(idMedia);
            }
            if(idUserGame && idProposition){
                let game_user_proposition = new Game_User_Proposition();
                game_user_proposition.user_game = await user_gameRepository.findOneOrFail(idUserGame);
                game_user_proposition.proposition = await propositionRepository.findOneOrFail(idProposition);
                game_user_propositionRepository.save(game_user_proposition)
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
            //After all send a 204 (no content, but accepted) response
            res.status(200).send("Game with id : "+id+" deleted");
        } catch (error) {
            res.status(404).send({"error": error.message});
            return;
        }

    };
};

export default GameController;