import shortid from 'shortid';
import defaultSettings from '../defaultSettings/defaultSettings';
import Shorted from '../database/index';

const hostAddress: string = `${defaultSettings.address}:${defaultSettings.port}/`
class Shorter{

    public async register(link: string):Promise<string>{

        if(link == ""){
            return "";
        }
        try{

            //Check if is already shorted
            let lastCharacters:string = link.slice(link.length - 9 );
            let idAlreadyRegistered:any = await Shorted.find({shortid: lastCharacters});
            if(idAlreadyRegistered.length > 0){
                return link;
            }

            //Check if is already registered
            let data:any = await Shorted.find({link}); 
            if(data.length > 0){
                return `${hostAddress}${data[0].shortid}`
            
            }

            //Gerenate a new Link
            let id:string =shortid.generate()
            const newShorted = new Shorted({ shortid: id, link});
            newShorted.save();
            return `${hostAddress}${id}`;
        }catch(err){
            return `Error: ${err}`
        }

    }
    
    public async find(id: string):Promise<string>{

        try{
            let data:any = await Shorted.find({"shortid": id});
            return data[0].link;
        }catch(err){
            return `Error: ${err}`
        }
    }
}

export default new Shorter;