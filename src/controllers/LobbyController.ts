import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Lobby } from "../entity/Lobby";

class LobbyController {

    static listAll = async (req: Request, res: Response) => {

        const lobbyRepository = getRepository(Lobby);
        const lobbys = await lobbyRepository.find({
            select: ["id", "description", "max_player", "game_mode", "creationDate", "statut"],
            relations: ["users"]
        });

        res.send(lobbys);
    };

    static getOneById = async (req: Request, res: Response) => {
        
        const id: number = parseInt(req.params.id);

        const lobbyRepository = getRepository(Lobby);
        try {
            const lobby = await lobbyRepository.findOneOrFail(id, {
                select: ["id", "description", "max_player", "game_mode", "creationDate", "statut"],
                relations: ["users"]
            });            
            res.status(200).send(lobby);
        } catch (error) {
            res.status(404).send("Lobby not found");
            return
        }        
    };

    static newLobby = async (req: Request, res: Response) => {

        //Get parameters from the body
        let { description, max_player, game_mode, creationDate, statut } = req.body;
        let lobby = new Lobby();
        lobby.description = description;
        lobby.max_player = max_player;
        lobby.game_mode = game_mode;
        lobby.creationDate = creationDate;
        lobby.statut = statut;        

        //Validade if the parameters are ok
        const errors = await validate(lobby);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const lobbyRepository = getRepository(Lobby);
        try {
            await lobbyRepository.save(lobby);
        } catch (e) {
            res.status(409).send("Lobby reference already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({"msg":"Lobby created","Lobby":lobby});
    };

    static editLobby = async (req: Request, res: Response) => {

        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { description, max_player, game_mode, creationDate, statut } = req.body;

        //Try to find user on database
        const lobbyRepository = getRepository(Lobby);
        try {

            const lobby = await lobbyRepository.findOneOrFail(id);

            lobby.description = description;
            lobby.max_player = max_player;
            lobby.game_mode = game_mode;
            lobby.creationDate = creationDate;
            lobby.statut = statut;

            /*const errors = await validate(lobby);
            if (errors.length > 0) {
                throw errors;
            }*/

            await lobbyRepository.save(lobby);

            res.status(200).send(lobby);

        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send(error);
            return;
        }

    };

    static deleteLobby = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const lobbyRepository = getRepository(Lobby);
        let lobby: Lobby;
        try {
            lobby = await lobbyRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Lobby not found");
            return;
        }
        lobbyRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(200).send("Lobby with id : "+id+" deleted");
    };
    
};

export default LobbyController;