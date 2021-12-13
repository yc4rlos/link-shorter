import express, {Request, Response} from 'express';

const Shorter = require('../Shorter/shorter');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './public/views' );
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.post('/', async (req: Request, res: Response) => {
    const {link} = req.body;
    try{

        const shortedLink = await Shorter.register(link);
        res.send(shortedLink);
        return;

    }catch(err){
        res.status(500);
        res.send("Internal Error:" + err);
    }
});

app.get('/:id', async (req: Request, res: Response) => {
    const id:string = req.params.id;
    try{
        const link = await Shorter.find(id);
        res.redirect(link);
    }catch(err){
        res.status(500);
        res.send("Internal Error:" + err);
    }
});

module.exports = app;