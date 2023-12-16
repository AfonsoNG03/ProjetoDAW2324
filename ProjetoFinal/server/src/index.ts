import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';

import { serverInfo } from "./serverInfo";

import * as Movies from "./movies";
import { IMovie } from "./movies";
import * as Actors from "./actors";
import { IActor } from "./actors";
import * as MovieShows from "./movieShows";
import { IMovieShow } from "./movieShows";

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

// Rota para lidar com solicitações GET para "/actors"
app.get("/actors", async (inRequest: Request, inResponse: Response) => {
    try {
        const actorsWorker: Actors.Worker = new Actors.Worker();
        const actors: IActor[] = await actorsWorker.listActors();
        inResponse.json(actors);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/actors"
app.post("/actors", async (inRequest: Request, inResponse: Response) => {
    try {
        const actorsWorker: Actors.Worker = new Actors.Worker();
        const actor: IActor = await actorsWorker.addActor(inRequest.body);
        inResponse.json(actor);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações DELETE para "/actors/:id"
app.delete("/actors/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const actorsWorker: Actors.Worker = new Actors.Worker();
        await actorsWorker.deleteActor(inRequest.params.id);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações GET para "/movieShows"
app.get("/movieShows", async (inRequest: Request, inResponse: Response) => {
    try {
        const movieShowsWorker: MovieShows.Worker = new MovieShows.Worker();
        const movieShows: IMovieShow[] = await movieShowsWorker.listMovieShows();
        inResponse.json(movieShows);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/movieShows"
app.post("/movieShows", async (inRequest: Request, inResponse: Response) => {
    try {
        const movieShowsWorker: MovieShows.Worker = new MovieShows.Worker();
        const movieShow: IMovieShow = await movieShowsWorker.addMovieShow(inRequest.body);
        inResponse.json(movieShow);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações DELETE para "/movieShows/:id"
app.delete("/movieShows/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const movieShowsWorker: MovieShows.Worker = new MovieShows.Worker();
        await movieShowsWorker.deleteMovieShow(inRequest.params.id);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error");
    }
});

app.listen(8080, () => { console.log("Server is listening on port 8080"); });



