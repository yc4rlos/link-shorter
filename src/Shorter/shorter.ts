const shortid = require('shortid');
const dSettings = require('../defaultSettings/defaultSettings');
let Shorted = require('../database/index');

const address: string = `${dSettings.address}:${dSettings.port}/`
class Shorter{

    public async register(link: string):Promise<string>{

        try{
            let data:any = await Shorted.find({link}); 
            if(data.length > 0){
                return `${address}${data[0].shortid}`
            
            }else{
                let id:string =shortid.generate()
                const newShorted = new Shorted({ shortid: id, link});
                newShorted.save();
                return `${address}${id}`;
            }
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

module.exports = new Shorter;