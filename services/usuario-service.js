const Usuario = require('../models/Usuario');

class UsuarioService {
    static async createUsuario(data) {
        const { error, data: result } = await Usuario.insert(data);
        if (error) throw error;
        return result;
    }

    static async getUsuarioById(id) {
        const { error, data } = await Usuario.getById(id);
        if (error) throw error;
        return data;
    }

    static async getAllUsuarios() {
        const { error, data } = await Usuario.getAll();
        if (error) throw error;
        return data;
    }

    static async updateUsuario(id, updates) {
        const { error } = await Usuario.update(id, updates);
        if (error) throw error;
        return { message: 'Usuário atualizado com sucesso' };
    }

    static async deleteUsuario(id) {
        const { error } = await Usuario.delete(id);
        if (error) throw error;
        return { message: 'Usuário removido com sucesso' };
    }
}

module.exports = UsuarioService;