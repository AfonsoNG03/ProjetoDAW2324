import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';
const cors = require('cors');

import { serverInfo } from "./serverInfo";

import * as Movies from "./movies";
import { IMovie } from "./movies";
import * as TvShows from "./tvShows";
import { ITvShow } from "./tvShows";
import * as Users from "./users";
import { IUser } from "./users";

const app: Express = express();

app.use(cors());

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

// Rota para lidar com solicitações GET para "/users"
app.get("/users", async (inRequest: Request, inResponse: Response) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        const users: IUser[] = await usersWorker.listUsers();
        inResponse.json(users);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/register"
app.post("/register", async (inRequest: Request, inResponse: Response) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        const user: IUser = await usersWorker.register(inRequest.body.username, inRequest.body.password);
        inResponse.json(user);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para fazer login

app.post("/login", async (inRequest: Request, inResponse: Response) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        const {user , token} = await usersWorker.login(inRequest.body.username, inRequest.body.password);
        inResponse.json({user, token});
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações DELETE para "/users/:id"

app.delete("/users/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        await usersWorker.deleteUser(inRequest.params.id);
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/users/:id/favoriteMovies"

app.post("/users/:id/favoriteMovies", async (inRequest: Request, inResponse: Response) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        const user: IUser = await usersWorker.updateFavoriteMovies(inRequest.params.id, inRequest.body.movies);
        inResponse.json(user);
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para lidar com solicitações POST para "/users/:id/favoriteTvShows"

app.post("/users/:id/favoriteTvShows", async (inRequest: Request, inResponse: Response) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        const user: IUser = await usersWorker.updateFavoriteTvShows(inRequest.params.id, inRequest.body.tvShows);
        inResponse.json(user);
    } catch (inError) {
        inResponse.send("error");
    }
});

app.listen(8080, () => { console.log("Server is listening on port 8080"); });



