// Importa o módulo 'path' do Node.js para manipulação de caminhos de arquivo e diretório
import path from "path";
// Importa o módulo 'fs' do Node.js para manipulação de arquivos do sistema
import fs from "fs";
export interface IServerInfo {
    http: {
        host: string, port: number,
        auth: { user: string, pass: string }
    }
}

export let serverInfo: IServerInfo;

// Lê o conteúdo do arquivo serverInfo.json de forma síncrona
const rawInfo: string = fs.readFileSync(path.join(__dirname, "../server/serverInfo.json"), "utf8");

// Converte a string contendo dados JSON em um objeto usando JSON.parse
serverInfo = JSON.parse(rawInfo); // string to object