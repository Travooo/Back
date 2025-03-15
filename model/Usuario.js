const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Usuario {
    constructor(id_usuario = null, admin, email, senha, nome_usuario, nome_completo, sobre, foto_perfil, data_nascimento) {
        this.id_usuario = id_usuario;
        this.admin = admin;
        this.email = email;
        this.senha = senha;
        this.nome_usuario = nome_usuario;
        this.nome_completo = nome_completo;
        this.sobre = sobre;
        this.foto_perfil = foto_perfil;
        this.data_nascimento = data_nascimento;
    }

    static async insert(usuario) {
        return await supabase.from('usuario').insert([usuario]).select();
    }

    static async getById(id) {
        return await supabase.from('usuario').select('*').eq('id_usuario', id).single();
    }

    static async getAll() {
        return await supabase.from('usuario').select('*');
    }

    static async update(id, updates) {
        return await supabase.from('usuario').update(updates).eq('id_usuario', id);
    }

    static async delete(id) {
        return await supabase.from('usuario').delete().eq('id_usuario', id);
    }
}

module.exports = Usuario;