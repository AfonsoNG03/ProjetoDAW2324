import * as path from "path";
const Datastore = require("nedb");

export interface IMovie {
    id: number, Title :string , year: number , rating: number , actors: string[]
}

