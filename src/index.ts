import express, {Request, Response} from 'express';
const Shorter = require('./Shorter/shorter');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    res.render('../views/home.ejs');
});

app.post('/', (req: Request, res: Response) => {
    const {link} = req.body;
    let resposta = Shorter.register();
    res.send(resposta);
    return;
});

app.listen(8080, () => {
    console.log("Link Shortner is running.");
});