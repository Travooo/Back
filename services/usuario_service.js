const Usuario = require('../model/Usuario');
const supabase = require('../config/db');

class UsuarioService {
    static async createUsuario(data) {
        const { error, data: result } = await supabase.from('usuarios').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getUsuarioById(id) {
        const { error, data } = await supabase.from('usuarios').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllUsuarios() {
        const { error, data } = await supabase.from('usuarios').select('*');
        if (error) throw error;
        return data;
    }

    static async updateUsuario(id, updates) {
        const { error } = await supabase.from('usuarios').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Usuário atualizado com sucesso' };
    }

    static async deleteUsuario(id) {
        const { error } = await supabase.from('usuarios').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Usuário removido com sucesso' };
    }
}

module.exports = UsuarioService;