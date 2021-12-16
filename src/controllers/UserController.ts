import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import config from "../config/config";
import { Lobby } from "../entity/Lobby";
import { ConflictException } from "@nestjs/common";
import { User_Trophy } from "../entity/User_Trophy";
import { Trophy } from "../entity/Trophy";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "email", "nom", "prenom", "pseudo", "birthday_date", "inscription_date", "last_connexion", "createdAt", "updatedAt"],
            relations: ["lobby", "user_trophy", "user_game"]
        });

        //Send the users object
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "email", "nom", "prenom", "pseudo", "birthday_date", "inscription_date", "last_connexion", "createdAt", "updatedAt"],
                relations: ["lobby", "user_trophy", "user_game"]
            });
            res.status(200).send(user);
        } catch (error) {
            res.status(404).send({"error": error.message});
        }
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { email, nom, prenom, pseudo, password, birthday_date, inscription_date, last_connexion} = req.body;

        let user = new User();

        user.email = email;
        user.nom = nom;
        user.prenom = prenom;
        user.pseudo = pseudo;
        user.password = password;
        user.birthday_date = birthday_date;
        user.inscription_date = inscription_date;
        user.last_connexion = last_connexion;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(409).send({"error": error.message});
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: "24h" }
        );

        res.status(201).send({"user":user, "token":token})

    };

    static editUser = async (req: Request, res: Response) => {
        
        //Get the ID from the url
        const id = req.params.id;
        //Get values from the body
        let { email, nom, prenom, pseudo, password, birthday_date, inscription_date, last_connexion, idLobby, idTrophy} = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        const lobbyRepository = getRepository(Lobby);
        const trophyRepository = getRepository(Trophy);
        const user_trophyRepository = getRepository(User_Trophy);

        let user;

        try {
            
            user = await userRepository.findOneOrFail(id, {
                select: ["id", "email", "nom", "prenom", "pseudo", "birthday_date", "inscription_date", "last_connexion", "createdAt", "updatedAt"],
                relations: ["lobby", "user_trophy", "user_game"]
            });

            if(password){
                user.password = req.body.password;
                req.body.password = user.hashPassword();
            }
    
            if(idLobby){
                user.lobby = await lobbyRepository.findOneOrFail(idLobby);
            }
            if(idTrophy){

                var result = user.user_trophy.filter(user_trophy => user_trophy.trophy.id == idTrophy);

                if(result.length != 0){
                    throw new ConflictException('User_Trophy already exist');
                }
                
                let user_trophy = new User_Trophy();
                user_trophy.trophy = await trophyRepository.findOneOrFail(idTrophy);
                user_trophy.user = user;
                user_trophy.obtention_date = new Date();
                user_trophyRepository.save(user_trophy)
            }
            await userRepository.save({...user, ...req.body });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"error":error.message});
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
            userRepository.delete(id);
        } catch (error) {
            res.status(404).send({"error": error.message});
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(200).send("User with id : "+id+" deleted");
    };
};

export default UserController;