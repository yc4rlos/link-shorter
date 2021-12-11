"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Shorter = require('./Shorter/shorter');
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('../views/home.ejs');
});
app.post('/', (req, res) => {
    const { link } = req.body;
    let resposta = Shorter.register();
    res.send(resposta);
    return;
});
app.listen(8080, () => {
    console.log("Link Shortner is running.");
});
