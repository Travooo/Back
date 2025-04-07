const supabase = require('../config/db');

class UsuarioOrganizacaoService {
    static async createUsuarioOrg(data) {
        const { error, data: result } = await supabase.from('organizacoes').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getUsuarioOrgById(id) {
        const { error, data } = await supabase.from('organizacoes').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllUsuariosOrg() {
        const { error, data } = await supabase.from('organizacoes').select('*');
        if (error) throw error;
        return data;
    }

    static async updateUsuarioOrg(id, updates) {
        const { error } = await supabase.from('organizacoes').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Usuário Organização atualizado com sucesso' };
    }

    static async deleteUsuarioOrg(id) {
        const { error } = await supabase.from('organizacoes').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Usuário Organização removido com sucesso' };
    }
}

module.exports = UsuarioOrganizacaoService;
