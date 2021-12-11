const shortid = require('shortid');

class Shorter{

    public register(link: string): string{
        //Verifica se o ID já não está registrado 
        // Registra o ID no banco de dados 
        console.log(link);
        return shortid.generate();
    }
    public async find(id: string): Promise<string>{
        //Procura o link usando um id, após isso deve retornar o link;
        return "aushsauh";
    }
}

module.exports = new Shorter;