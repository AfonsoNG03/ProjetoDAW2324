import * as path from "path";
import * as fs from 'fs';
const Datastore = require("nedb");

export interface ITvShow {
    title: string, year: number, rating: number, category: string, director: string, description: string, image: string
}

export class Worker {
    private db: Nedb;

    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "tvShows.db"),
            autoload: true
        });
    }

    public listTvShows(): Promise<ITvShow[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: ITvShow[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    public addTvShow(inMovieShow: ITvShow): Promise<ITvShow> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inMovieShow,
                (inError: Error | null, inNewDoc: ITvShow) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public deleteTvShow(inID: string): Promise<void> {
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

    public addTvShowsFromFile(filePath: string): Promise<ITvShow[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const tvShows: ITvShow[] = JSON.parse(data);
                    const promises = tvShows.map(tvShow => this.addTvShow(tvShow));
                    Promise.all(promises).then(resolve).catch(reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}

