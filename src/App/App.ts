import express, {Request, Response} from 'express';
import Shorter from '../Shorter/shorter';
import defaultSettings from '../defaultSettings/defaultSettings';

const app = express();
const hostAddress:string = `${defaultSettings.address}:${defaultSettings.port}/`; 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './public/views' );
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
    res.render('home', {link: "", disabled: false, hostAddress});
    console.log()
});

app.post('/', async (req: Request, res: Response) => {
    const {link} = req.body;
    try{
        const alreadyRegistered = await Shorter.find(link);
        
        const shortedLink = await Shorter.register(link);
        res.render('home', {link: shortedLink, disabled: true, hostAddress});
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

export default app;