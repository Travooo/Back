const UsuarioOrganizacao = require('../models/UsuarioOrganizacao');

class UsuarioOrganizacaoService {
    static async createUsuarioOrganizacao(data) {
        const { error, data: result } = await UsuarioOrganizacao.insert(data);
        if (error) throw error;
        return result;
    }

    static async getUsuarioOrganizacaoById(id) {
        const { error, data } = await UsuarioOrganizacao.getById(id);
        if (error) throw error;
        return data;
    }

    static async getAllUsuarioOrganizacao() {
        const { error, data } = await UsuarioOrganizacao.getAll();
        if (error) throw error;
        return data;
    }

    static async updateUsuarioOrganizacao(id, updates) {
        const { error } = await UsuarioOrganizacao.update(id, updates);
        if (error) throw error;
        return { message: 'Usuário Organização atualizado com sucesso' };
    }

    static async deleteUsuarioOrganizacao(id) {
        const { error } = await UsuarioOrganizacao.delete(id);
        if (error) throw error;
        return { message: 'Usuário Organização removido com sucesso' };
    }
}

module.exports = UsuarioOrganizacaoService;
