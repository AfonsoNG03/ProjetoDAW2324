import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';

import { serverInfo } from "./serverInfo";

import * as Movies from "./movies";
import { IMovie } from "./movies";
import * as TvShows from "./tvShows";
import { ITvShow } from "./tvShows";

const app: Express = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, " ../../client/dist")));

app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

// Rota para lidar com solicitações GET para "/movies"
app.get("/movies", async (inRequest: Request, inResponse: Response) => {
    try {
        const moviesWorker: Movies.Worker = new Movies.Worker();
        const movies: IMovie[] = await moviesWorker.listMovies();
        inResponse.json(movies);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/movies"
app.post("/movies", async (inRequest: Request, inResponse: Response) => {
    try {
        const moviesWorker: Movies.Worker = new Movies.Worker();
        const movie: IMovie = await moviesWorker.addMovie(inRequest.body);
        inResponse.json(movie);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações DELETE para "/movies/:id"
app.delete("/movies/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const moviesWorker: Movies.Worker = new Movies.Worker();
        await moviesWorker.deleteMovie(inRequest.params.id);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações GET para "/tvShows"
app.get("/tvShows", async (inRequest: Request, inResponse: Response) => {
    try {
        const tvShowsWorker: TvShows.Worker = new TvShows.Worker();
        const tvShows: ITvShow[] = await tvShowsWorker.listTvShows();
        inResponse.json(tvShows);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/tvShows"
app.post("/tvShows", async (inRequest: Request, inResponse: Response) => {
    try {
        const tvShowsWorker: TvShows.Worker = new TvShows.Worker();
        const tvShow: ITvShow = await tvShowsWorker.addTvShow(inRequest.body);
        inResponse.json(tvShow);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações DELETE para "/tvShows/:id"
app.delete("/tvShows/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const tvShowsWorker: TvShows.Worker = new TvShows.Worker();
        await tvShowsWorker.deleteTvShow(inRequest.params.id);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.listen(8080, () => { console.log("Server is listening on port 8080"); });



