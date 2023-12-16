import * as path from "path";
const Datastore = require("nedb");

export interface IActor {
    name: string, image: string, age: number, description: string
}

export class Worker {
    private db: Nedb;

    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "actors.db"),
            autoload: true
        });
    }

    public listActors(): Promise<IActor[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: IActor[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    public addActor(inActor: IActor): Promise<IActor> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inActor,
                (inError: Error | null, inNewDoc: IActor) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public deleteActor(inID: string): Promise<void> {
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