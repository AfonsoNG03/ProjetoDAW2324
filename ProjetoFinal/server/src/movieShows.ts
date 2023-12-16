import * as path from "path";
const Datastore = require("nedb");

export interface IMovieShow {
    title: string, year: number, rating: number, category: string, director: string, description: string, image: string
}

export class Worker {
    private db: Nedb;

    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "moviesShows.db"),
            autoload: true
        });
    }

    public listMovieShows(): Promise<IMovieShow[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: IMovieShow[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    public addMovieShow(inMovieShow: IMovieShow): Promise<IMovieShow> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inMovieShow,
                (inError: Error | null, inNewDoc: IMovieShow) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public deleteMovieShow(inID: string): Promise<void> {
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
}