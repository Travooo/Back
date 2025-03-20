const Usuario = require('../model/Usuario');
const supabase = require('../config/db');

class UsuarioService {
    static async createUsuario(data) {
        const { error, data: result } = await supabase.from('usuario').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getUsuarioById(id) {
        const { error, data } = await supabase.from('usuario').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllUsuarios() {
        const { error, data } = await supabase.from('usuario').select('*');
        if (error) throw error;
        return data;
    }

    static async updateUsuario(id, updates) {
        const { error } = await supabase.from('usuario').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Usuário atualizado com sucesso' };
    }

    static async deleteUsuario(id) {
        const { error } = await supabase.from('usuario').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Usuário removido com sucesso' };
    }
}

module.exports = UsuarioService;