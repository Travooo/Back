const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.URL, process.env.APIKEY);

class Notificacoes {
    constructor(id_notificacoes = null, titulo, descricao, id_usuario) {
        this.id_notificacoes = id_notificacoes;
        this.titulo = titulo;
        this.descricao = descricao;
        this.id_usuario = id_usuario;
    }

    static async insert(notificacao) {
        return await supabase.from('notificacoes').insert([notificacao]).select();
    }

    static async getById(id) {
        return await supabase.from('notificacoes').select('*').eq('id_notificacoes', id).single();
    }

    static async getAll() {
        return await supabase.from('notificacoes').select('*');
    }

    static async delete(id) {
        return await supabase.from('notificacoes').delete().eq('id_notificacoes', id);
    }
}

module.exports = Notificacoes;