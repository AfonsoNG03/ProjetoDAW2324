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

    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "users.db"),
            autoload: true
        });
    }

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

    public addFavoriteMovie(inUsername: string, inMovie: IMovie): Promise<IUser> {
        return new Promise(async (inResolve, inReject) => {
            try {
                const user: IUser = await this.getUser(inUsername);
                user.favoriteMovies.push(inMovie);
                this.db.update({user}, user, {},
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

    public addFavoriteTvShow(inUsername: string, inTvShow: ITvShow): Promise<IUser> {
        return new Promise(async (inResolve, inReject) => {
            try {
                const user: IUser = await this.getUser(inUsername);
                user.favoriteTvShows.push(inTvShow);
                this.db.update({user}, user, {},
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