import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Game } from "../entity/Game";
import { User } from "../entity/User";

class GameController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const gameRepository = getRepository(Game);
        const games = await gameRepository.find({
            select: ["id", "name", "description", "statut", "tour"],
            relations: ["juge", "userGames"]
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
                select: ["id", "name", "description", "statut", "tour"],
                relations: ["user", "userGames"]
            });
            res.status(200).send(game);
        } catch (error) {
            res.status(404).send("Game not found");
        }
    };

    static newGame = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { id, name, description, statut, tour } = req.body;

        let game = new Game();

        game.name = name;
        game.description = description;
        game.statut = statut;
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
        } catch (e) {
            res.status(409).send(e.message);
            return;
        }

        res.status(201).send({"game":game})

    };

    static editGame = async (req: Request, res: Response) => {
        
        //Get the ID from the url
        const id = req.params.id;
        //Get values from the body
        let { name, description, statut, tour, idJuge, idUser } = req.body;

        //Try to find game on database
        const gameRepository = getRepository(Game);
        const userRepository = getRepository(User);

        let game;
        try {
            game = await gameRepository.findOneOrFail(id);
            if(idJuge){
                game.juge = await userRepository.findOneOrFail(idJuge);
            }
    
            if(idUser){
                // TODO UserGames controller
                game.userGames = [await userRepository.findOneOrFail(idUser)];
            }
            await gameRepository.save({...game, ...req.body });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"error": error.message});
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteGame = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const gameRepository = getRepository(Game);
        let game: Game;
        try {
            game = await gameRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Game not found");
            return;
        }
        gameRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(200).send("Game with id : "+id+" deleted");
    };
};

export default GameController;