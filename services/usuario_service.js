const supabase = require('../config/db');

class UsuarioService {
    static async createUsuario(data) {
        if (data.created_at === undefined || data.created_at === null) {
            delete data.created_at;
        }
        const { error, data: result } = await supabase
            .from('usuarios')
            .insert([data], { returning: 'representation' });
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

    static async getUsuarioByEmail(email) {
        const { error, data } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();
        if (error || !data) return null;
        console.log(data)
        return data;
    }
}

module.exports = UsuarioService;