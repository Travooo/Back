const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class LocalVisitado {
    constructor(id_local_visitado = null, id_estabelecimento, id_usuario, data_visita) {
        this.id_local_visitado = id_local_visitado;
        this.id_estabelecimento = id_estabelecimento;
        this.id_usuario = id_usuario;
        this.data_visita = data_visita;
    }
    static async insert(localVisitado) {
        return await supabase.from('local_visitado').insert([localVisitado]).select();
    }

    static async getById(id) {
        return await supabase.from('local_visitado').select('*').eq('id_local_visitado', id).single();
    }

    static async getAll() {
        return await supabase.from('local_visitado').select('*');
    }

    static async delete(id) {
        return await supabase.from('local_visitado').delete().eq('id_local_visitado', id);
    }
}

module.exports = LocalVisitado;