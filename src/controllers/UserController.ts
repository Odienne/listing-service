import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import config from "../config/config";
import { Lobby } from "../entity/Lobby";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "email", "nom", "prenom", "pseudo", "dateOfBirth", "dateInscription", "dateLastConnexion"],
            relations: ["lobby"]
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
                select: ["id", "email", "nom", "prenom", "pseudo", "dateOfBirth", "dateInscription", "dateLastConnexion"],
                relations: ["lobby"]
            });
            res.status(200).send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { email, nom, prenom, pseudo, password, dateOfBirth, dateInscription, dateLastConnexion} = req.body;

        let user = new User();

        user.email = email;
        user.nom = nom;
        user.prenom = prenom;
        user.pseudo = pseudo;
        user.password = password;
        user.dateOfBirth = dateOfBirth;
        user.dateInscription = dateInscription;
        user.dateLastConnexion = dateLastConnexion;

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
        } catch (e) {
            res.status(409).send(e.message);
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
        let { email, nom, prenom, pseudo, password, dateOfBirth, dateInscription, dateLastConnexion, idLobby} = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        const lobbyRepository = getRepository(Lobby);

        let user;
        try {
            user = await userRepository.findOneOrFail(id);
            if(password){
                user.password = req.body.password;
                req.body.password = user.hashPassword();
            }
    
            if(idLobby){
                user.lobby = await lobbyRepository.findOneOrFail(idLobby);
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
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(200).send("User with id : "+id+" deleted");
    };
};

export default UserController;