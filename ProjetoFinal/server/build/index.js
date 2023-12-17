"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const Movies = __importStar(require("./movies"));
const TvShows = __importStar(require("./tvShows"));
const Users = __importStar(require("./users"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, " ../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
// Rota para lidar com solicitações GET para "/movies"
app.get("/movies", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesWorker = new Movies.Worker();
        const movies = yield moviesWorker.listMovies();
        inResponse.json(movies);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações POST para "/movies"
app.post("/movies", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesWorker = new Movies.Worker();
        const movie = yield moviesWorker.addMovie(inRequest.body);
        inResponse.json(movie);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações DELETE para "/movies/:id"
app.delete("/movies/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesWorker = new Movies.Worker();
        yield moviesWorker.deleteMovie(inRequest.params.id);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações GET para "/tvShows"
app.get("/tvShows", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tvShowsWorker = new TvShows.Worker();
        const tvShows = yield tvShowsWorker.listTvShows();
        inResponse.json(tvShows);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações POST para "/tvShows"
app.post("/tvShows", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tvShowsWorker = new TvShows.Worker();
        const tvShow = yield tvShowsWorker.addTvShow(inRequest.body);
        inResponse.json(tvShow);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações DELETE para "/tvShows/:id"
app.delete("/tvShows/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tvShowsWorker = new TvShows.Worker();
        yield tvShowsWorker.deleteTvShow(inRequest.params.id);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações GET para "/users"
app.get("/users", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const users = yield usersWorker.listUsers();
        inResponse.json(users);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações POST para "/register"
app.post("/register", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const user = yield usersWorker.register(inRequest.body.username, inRequest.body.password);
        inResponse.json(user);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para fazer login
app.post("/login", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const { user, token } = yield usersWorker.login(inRequest.body.username, inRequest.body.password);
        inResponse.json({ user, token });
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações DELETE para "/users/:id"
app.delete("/users/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        yield usersWorker.deleteUser(inRequest.params.id);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações POST para "/users/:id/favoriteMovies"
app.post("/users/:id/favoriteMovies", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const user = yield usersWorker.addFavoriteMovie(inRequest.params.id, inRequest.body.movieID);
        inResponse.json(user);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.listen(8080, () => { console.log("Server is listening on port 8080"); });
