const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.URL, process.env.APIKEY);

class Estabelecimento {
    constructor(id_estabelecimento = null, nome, sobre, endereco, foto_local, horarios) {
        this.id_estabelecimento = id_estabelecimento;
        this.nome = nome;
        this.sobre = sobre;
        this.endereco = endereco;
        this.foto_local = foto_local;
        this.horarios = horarios;
    }
}

module.exports = Estabelecimento;