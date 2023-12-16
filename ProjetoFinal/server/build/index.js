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
const Actors = __importStar(require("./actors"));
const MovieShows = __importStar(require("./movieShows"));
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
// Rota para lidar com solicitações GET para "/actors"
app.get("/actors", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actorsWorker = new Actors.Worker();
        const actors = yield actorsWorker.listActors();
        inResponse.json(actors);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações POST para "/actors"
app.post("/actors", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actorsWorker = new Actors.Worker();
        const actor = yield actorsWorker.addActor(inRequest.body);
        inResponse.json(actor);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações DELETE para "/actors/:id"
app.delete("/actors/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actorsWorker = new Actors.Worker();
        yield actorsWorker.deleteActor(inRequest.params.id);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações GET para "/movieShows"
app.get("/movieShows", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieShowsWorker = new MovieShows.Worker();
        const movieShows = yield movieShowsWorker.listMovieShows();
        inResponse.json(movieShows);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações POST para "/movieShows"
app.post("/movieShows", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieShowsWorker = new MovieShows.Worker();
        const movieShow = yield movieShowsWorker.addMovieShow(inRequest.body);
        inResponse.json(movieShow);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para lidar com solicitações DELETE para "/movieShows/:id"
app.delete("/movieShows/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieShowsWorker = new MovieShows.Worker();
        yield movieShowsWorker.deleteMovieShow(inRequest.params.id);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.listen(8080, () => { console.log("Server is listening on port 8080"); });
