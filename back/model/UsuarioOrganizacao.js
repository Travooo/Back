const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class UsuarioOrganizacao {
    constructor(id_usuario_organizacao = null, id_usuario, cnpj, nome_fantasia, endereco) {
        this.id_usuario_organizacao = id_usuario_organizacao;
        this.id_usuario = id_usuario;
        this.cnpj = cnpj;
        this.nome_fantasia = nome_fantasia;
        this.endereco = endereco;
    }

    static async insert(usuarioOrganizacao) {
        return await supabase.from('usuario_organizacao').insert([usuarioOrganizacao]).select();
    }

    static async getById(id) {
        return await supabase.from('usuario_organizacao').select('*').eq('id_usuario_organizacao', id).single();
    }

    static async getAll() {
        return await supabase.from('usuario_organizacao').select('*');
    }

    static async update(id, updates) {
        return await supabase.from('usuario_organizacao').update(updates).eq('id_usuario_organizacao', id);
    }

    static async delete(id) {
        return await supabase.from('usuario_organizacao').delete().eq('id_usuario_organizacao', id);
    }
}

module.exports = UsuarioOrganizacao;