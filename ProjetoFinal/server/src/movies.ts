import * as path from "path";
import * as fs from "fs";
const Datastore = require("nedb");

export interface IMovie {
    title :string , year: number , rating: number , category: string , director: string , description: string , image: string
}

export class Worker {
    private db: Nedb;

    //Construtor para inicializar a NeDB
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "movies.db"),
            autoload: true
        });
    }
    
    //Funcao que recupera uma lista de todos os filmes da base de dados
    public listMovies(): Promise<IMovie[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({},
                (inError: Error | null, inDocs: IMovie[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    //Funcao para adicionar um filme para a base de dados
    public addMovie(inMovie: IMovie): Promise<IMovie> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inMovie,
                (inError: Error | null, inNewDoc: IMovie) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }
    
    //Funcao para deletar um filme da base de dados
    public deleteMovie(inID: string): Promise<void> {
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

    //Funcao para adicionar um filme a partir de um ficheiro JSON para a base de dados
    public addMoviesFromFile(filePath: string): Promise<IMovie[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const movies: IMovie[] = JSON.parse(data);
                    const promises = movies.map(movie => this.addMovie(movie));
                    Promise.all(promises).then(resolve).catch(reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}

