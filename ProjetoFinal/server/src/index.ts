import path from 'path';
import express, { Express ,NextFunction ,Request ,Response } from 'express';

import { serverInfo } from "./serverInfo";

const app : Express = express();
app.use(express.json());

app.use("/", express.static(path.join( __dirname, " ../../client/dist")));

app.use(function(inRequest : Request, inResponse : Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
    });

app.listen(8080, () => {console.log("Server is listening on port 8080");});



