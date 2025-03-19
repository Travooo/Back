const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.URL, process.env.APIKEY);

class Pagamento {
    constructor(id_pagamento = null, tipo_pagamento, id_usuario) {
        this.id_pagamento = id_pagamento;
        this.tipo_pagamento = tipo_pagamento;
        this.id_usuario = id_usuario;
    }

    static async insert(pagamento) {
        return await supabase.from('pagamento').insert([pagamento]).select();
    }

    static async getById(id) {
        return await supabase.from('pagamento').select('*').eq('id_pagamento', id).single();
    }

    static async getAll() {
        return await supabase.from('pagamento').select('*');
    }

    static async delete(id) {
        return await supabase.from('pagamento').delete().eq('id_pagamento', id);
    }
}

module.exports = Pagamento;