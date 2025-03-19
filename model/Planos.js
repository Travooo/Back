const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.URL, process.env.APIKEY);

class Plano {
    constructor(id_plano = null, tipo_pagamento, id_usuario) {
        this.id_plano = id_plano;
        this.tipo_pagamento = tipo_pagamento;
        this.id_usuario = id_usuario;
    }
}

module.exports = Plano;
