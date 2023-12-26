import * as path from "path";
import { IMovie } from "./movies";
import { ITvShow } from "./tvShows";
const Datastore = require("nedb");
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

export interface IUser {
    username: string, password: string, favoriteMovies: IMovie[], favoriteTvShows: ITvShow[]
}

export class Worker {
    private db: Nedb;

    //Construtor para inicializar a NeDB
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "users.db"),
            autoload: true
        });
    }

    //Funcao que recupera uma lista de todos os utilizador da base de dados
    public listUsers(): Promise<IUser[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: IUser[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    //Funcao para resgistar um novo utilizador
    public register(username: string, password: string): Promise<IUser> {
        return new Promise(async (inResolve, inReject) => {
            try {
                password = await bcrypt.hash(password, 10);
            } catch (inError) {
                inReject(inError);
            }

            const inUser: IUser = { username: username, password: password, favoriteMovies: [], favoriteTvShows: [] };

            this.db.insert(inUser,
                (inError: Error | null, inNewDoc: IUser) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    //Funcao que recupera um utilizador pelo nome
    public getUser(inUsername: string): Promise<IUser> {
        return new Promise((inResolve, inReject) => {
            this.db.find({ username: inUsername },
                (inError: Error | null, inDocs: IUser[]) => {
                    if (inError) {
                        inReject(inError);
                    } else if (inDocs.length === 0) {
                        inReject(new Error("User not found."));
                    } else {
                        inResolve(inDocs[0]);
                    }
                }
            );
        });
    }

    //Funcao que recupera um utilizador pelo ID
    public getUserByID(inID: string): Promise<IUser> {
        return new Promise((inResolve, inReject) => {
            this.db.find({ _id: inID },
                (inError: Error | null, inDocs: IUser[]) => {
                    if (inError) {
                        inReject(inError);
                    } else if (inDocs.length === 0) {
                        inReject(new Error("User not found."));
                    } else {
                        inResolve(inDocs[0]);
                    }
                }
            );
        });
    }

    //Funcao para fazer o login do utilizador
    public login(username: string, password: string): Promise<{user: IUser, token: string}> {
        return new Promise(async (inResolve, inReject) => {
            try {
                const user: IUser = await this.getUser(username);
                const match: boolean = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });
                    inResolve({user, token});
                } else {
                    inReject(new Error("Invalid credentials."));
                }
            } catch (inError) {
                inReject(inError);
            }
        });
    }
    
    //Funcao para deletar um utilizador da base de dados pelo ID
    public deleteUser(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID },
                {},
                (inError: Error | null, inNumRemoved: number) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }

    //Funcao para atualizar a lista de filmes favoritos de um utilizador
    public updateFavoriteMovies(inID: string, inFavoriteMovies: IMovie[]): Promise<IUser> {
        return new Promise(async (inResolve, inReject) => {
            try {
                const user: IUser = await this.getUserByID(inID);
                user.favoriteMovies = inFavoriteMovies;
                this.db.update({ _id: inID }, { $set: { favoriteMovies: inFavoriteMovies } }, {},
                    (inError: Error | null, inNumReplaced: number) => {
                        if (inError) {
                            inReject(inError);
                        } else {
                            inResolve(user);
                        }
                    }
                );
            } catch (inError) {
                inReject(inError);
            }
        });
    }

    //Funcao para atualizar a lista de series favoritas de um utilizador
    public updateFavoriteTvShows(inID: string, inFavoriteTvShows: ITvShow[]): Promise<IUser> {
        return new Promise(async (inResolve, inReject) => {
            try {
                const user: IUser = await this.getUserByID(inID);
                user.favoriteTvShows = inFavoriteTvShows;
                this.db.update({ _id: inID }, { $set: { favoriteTvShows: inFavoriteTvShows } }, {},
                    (inError: Error | null, inNumReplaced: number) => {
                        if (inError) {
                            inReject(inError);
                        } else {
                            inResolve(user);
                        }
                    }
                );
            } catch (inError) {
                inReject(inError);
            }
        });
    }
}