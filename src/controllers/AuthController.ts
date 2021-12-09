import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";

class AuthController {

  static login = async (req: Request, res: Response) => {

    //Check if username and password are set
    let { email, password, type } = req.body;

    // Check if field is missing

    try{

      if (!(email && password)) {
        throw 'Fields missing';
      }

    }catch(error){
      res.status(401).send({"message":"Unauthorized"});
      return;
    }

    //Get user from database
    const userRepository = getRepository(User);

    let user: User;

    // Checks

    try {

      user = await userRepository.findOneOrFail({ relations: ["orders"], where: { email }, select: ['id', 'role', 'email', 'password', 'firstname', 'lastname', "mobilePhoneNumber", "landlinePhoneNumber"]  });

      //Check if encrypted password match
      if(!user.checkIfUnencryptedPasswordIsValid(password)){
        throw "Unauthorized";
      }

      //Check user's role
      if(user.role != "ADMIN" && type === 'backoffice'){
        throw 'Unauthorized';
      }

    } catch (error) {
      res.status(401).send({"message":"Unauthorized"});
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: "24h" }
    );

    //Send the jwt in the response
    res.send({"token":token, "user":user});
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id, {select: ['id', 'email', 'password', "firstname", "lastname", "role", "mobilePhoneNumber", "landlinePhoneNumber", "civility", "dateOfBirth"]});
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };

  static checkToken = async (req: Request, res: Response) => {

    //Get parameters from the body
    const { token } = req.body;

    try{

      var isOk = jwt.verify(token, config.jwtSecret);
      res.status(200).send({"statusToken":true});

    }catch(error){
      res.status(200).send({"statusToken":false});
    }

  };

}
export default AuthController;