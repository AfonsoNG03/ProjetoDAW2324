"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
// Importa o módulo 'path' do Node.js para manipulação de caminhos de arquivo e diretório
const path_1 = __importDefault(require("path"));
// Importa o módulo 'fs' do Node.js para manipulação de arquivos do sistema
const fs_1 = __importDefault(require("fs"));
// Lê o conteúdo do arquivo serverInfo.json de forma síncrona
const rawInfo = fs_1.default.readFileSync(path_1.default.join(__dirname, "../server/serverInfo.json"), "utf8");
// Converte a string contendo dados JSON em um objeto usando JSON.parse
exports.serverInfo = JSON.parse(rawInfo); // string to object
