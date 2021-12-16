import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Media } from "../entity/Media";
import { User } from "../entity/User";

class MediaController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const mediaRepository = getRepository(Media);
        const medias = await mediaRepository.find({
            select: ["id", "url"],
            relations: ["games"]
        });

        //Send the users object
        res.send(medias);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = parseInt(req.params.id);

        //Get the media from database
        const mediaRepository = getRepository(Media);
        try {
            const media = await mediaRepository.findOneOrFail(id, {
                select: ["id", "url"],
                relations: ["games"]
            });
            res.status(200).send(media);
        } catch (error) {
            res.status(404).send("Media not found");
        }
    };

    static newMedia = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { id, url } = req.body;

        let media = new Media();

        media.url = url;

        //Validade if the parameters are ok
        const errors = await validate(media);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const mediaRepository = getRepository(Media);
        try {
            await mediaRepository.save(media);
        } catch (e) {
            res.status(409).send(e.message);
            return;
        }

        res.status(201).send({"media":media})

    };

    static editMedia = async (req: Request, res: Response) => {
        
        //Get the ID from the url
        const id = req.params.id;
        //Get values from the body
        let { url } = req.body;

        //Try to find media on database
        const mediaRepository = getRepository(Media);

        let media;
        try {
            media = await mediaRepository.findOneOrFail(id);
            await mediaRepository.save({...media, ...req.body });
            //After all send a 204 (no content, but accepted) response
            res.status(204).send();
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"error": error.message});
            return;
        }

    };

    static deleteMedia = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const mediaRepository = getRepository(Media);
        let media: Media;
        try {
            media = await mediaRepository.findOneOrFail(id);
            //After all send a 204 (no content, but accepted) response
            res.status(200).send("Media with id : "+id+" deleted");
        } catch (error) {
            res.status(404).send("Media not found");
            return;
        }
        mediaRepository.delete(id);
    };
};

export default MediaController;