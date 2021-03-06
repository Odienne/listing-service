import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    app.use(bodyParser.json({limit: '10mb'}))
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

    // Call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3002, () => {
      console.log("Server started on port 3002!");
    });
  })
  .catch(error => console.log(error));
