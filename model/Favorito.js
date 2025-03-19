const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.URL, process.env.APIKEY);

class Favorito {
    constructor(id_favorito = null, id_usuario, id_estabelecimento) {
        this.id_favorito = id_favorito;
        this.id_usuario = id_usuario;
        this.id_estabelecimento = id_estabelecimento;
    }
}

module.exports = Favorito;