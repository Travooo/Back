const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Plano {
    constructor(id_plano = null, tipo_pagamento, id_usuario) {
        this.id_plano = id_plano;
        this.tipo_pagamento = tipo_pagamento;
        this.id_usuario = id_usuario;
    }

    static async insert(plano) {
        return await supabase.from('plano').insert([plano]).select();
    }

    static async getById(id) {
        return await supabase.from('plano').select('*').eq('id_plano', id).single();
    }

    static async getAll() {
        return await supabase.from('plano').select('*');
    }

    static async delete(id) {
        return await supabase.from('plano').delete().eq('id_plano', id);
    }
}

module.exports = Plano;
