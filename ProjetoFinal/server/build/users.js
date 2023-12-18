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
const Datastore = require("nedb");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class Worker {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "users.db"),
            autoload: true
        });
    }
    listUsers() {
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
    register(username, password) {
        return new Promise((inResolve, inReject) => __awaiter(this, void 0, void 0, function* () {
            try {
                password = yield bcrypt.hash(password, 10);
            }
            catch (inError) {
                inReject(inError);
            }
            const inUser = { username: username, password: password, favoriteMovies: [], favoriteTvShows: [] };
            this.db.insert(inUser, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        }));
    }
    getUser(inUsername) {
        return new Promise((inResolve, inReject) => {
            this.db.find({ username: inUsername }, (inError, inDocs) => {
                if (inError) {
                    inReject(inError);
                }
                else if (inDocs.length === 0) {
                    inReject(new Error("User not found."));
                }
                else {
                    inResolve(inDocs[0]);
                }
            });
        });
    }
    getUserByID(inID) {
        return new Promise((inResolve, inReject) => {
            this.db.find({ _id: inID }, (inError, inDocs) => {
                if (inError) {
                    inReject(inError);
                }
                else if (inDocs.length === 0) {
                    inReject(new Error("User not found."));
                }
                else {
                    inResolve(inDocs[0]);
                }
            });
        });
    }
    login(username, password) {
        return new Promise((inResolve, inReject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUser(username);
                const match = yield bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });
                    inResolve({ user, token });
                }
                else {
                    inReject(new Error("Invalid credentials."));
                }
            }
            catch (inError) {
                inReject(inError);
            }
        }));
    }
    deleteUser(inID) {
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
    updateFavoriteMovies(inID, inFavoriteMovies) {
        return new Promise((inResolve, inReject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByID(inID);
                user.favoriteMovies = inFavoriteMovies;
                this.db.update({ _id: inID }, { $set: { favoriteMovies: inFavoriteMovies } }, {}, (inError, inNumReplaced) => {
                    if (inError) {
                        inReject(inError);
                    }
                    else {
                        inResolve(user);
                    }
                });
            }
            catch (inError) {
                inReject(inError);
            }
        }));
    }
    updateFavoriteTvShows(inID, inFavoriteTvShows) {
        return new Promise((inResolve, inReject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByID(inID);
                user.favoriteTvShows = inFavoriteTvShows;
                this.db.update({ user }, user, {}, (inError, inNumReplaced) => {
                    if (inError) {
                        inReject(inError);
                    }
                    else {
                        inResolve(user);
                    }
                });
            }
            catch (inError) {
                inReject(inError);
            }
        }));
    }
}
exports.Worker = Worker;
