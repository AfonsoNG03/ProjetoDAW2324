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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const Datastore = require("nedb");
class Worker {
    //Construtor para inicializar a NeDB
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "tvShows.db"),
            autoload: true
        });
    }
    //Funcao que recupera uma lista de todas as series da base de dados
    listTvShows() {
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
    //Funcao para adicionar uma serie para a base de dados
    addTvShow(inMovieShow) {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inMovieShow, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    //Funcao para deletar uma serie da base de dados
    deleteTvShow(inID) {
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
    //Funcao para adicionar uma serie a partir de um ficheiro JSON para a base de dados
    addTvShowsFromFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const tvShows = JSON.parse(data);
                    const promises = tvShows.map(tvShow => this.addTvShow(tvShow));
                    Promise.all(promises).then(resolve).catch(reject);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
exports.Worker = Worker;
