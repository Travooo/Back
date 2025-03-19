const LocalVisitado = require('../model/LocalVisitado');
const supabase = require('../config/db');

class LocalVisitadoService {
    static async createLocalVisitado(data) {
        const { error, data: result } = await LocalVisitado.insert(data);
        if (error) throw error;
        return result;
    }

    static async getLocalVisitadoById(id) {
        const { error, data } = await LocalVisitado.getById(id);
        if (error) throw error;
        return data;
    }

    static async getAllLocalVisitados() {
        const { error, data } = await LocalVisitado.getAll();
        if (error) throw error;
        return data;
    }

    static async deleteLocalVisitado(id) {
        const { error } = await LocalVisitado.delete(id);
        if (error) throw error;
        return { message: 'Local visitado removido com sucesso' };
    }
}

module.exports = LocalVisitadoService;