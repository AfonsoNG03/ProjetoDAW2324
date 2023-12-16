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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const Datastore = require("nedb");
class Worker {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "movies.db"),
            autoload: true
        });
    }
    listMovies() {
        return new Promise((inResolve, inReject) => {
            this.db.find({}, (inError, inDocs) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    }
    addMovie(inMovie) {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inMovie, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    deleteMovie(inID) {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID }, {}, (inError, inNumRemoved) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    }
    addMoviesFromFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Read the content of movies.json
                const fileContent = fs.readFileSync(filePath, "utf8");
                // Parse the JSON content
                const movies = JSON.parse(fileContent);
                // Add each movie to the NeDB database
                for (const movie of movies) {
                    yield this.addMovie(movie);
                }
                console.log("Movies added to the database successfully.");
            }
            catch (error) {
                console.error("Error adding movies to the database:", error);
                throw error;
            }
        });
    }
}
exports.Worker = Worker;
const worker = new Worker();
const filePath = path.join(__dirname, "movies_transformed.json");
// Add movies from the file to the database
worker.addMoviesFromFile(filePath)
    .then(() => {
    // List movies after adding
    return worker.listMovies();
})
    .then((movies) => {
    console.log("Movies in the database:", movies);
})
    .catch((error) => {
    console.error("Error:", error);
});
