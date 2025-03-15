const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Anexo {
    constructor(id_anexo, estabelecimento, arquivo, nome_arquivo, tipo_arquivo) {
        this.id_anexo = id_anexo;
        this.estabelecimento = estabelecimento;
        this.arquivo = arquivo;
        this.nome_arquivo = nome_arquivo;
        this.tipo_arquivo = tipo_arquivo;
    }
}

module.exports = Anexo;