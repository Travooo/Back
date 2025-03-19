const Plano = require('../model/Planos');
const supabase = require('../config/db');

class PlanoService {
    static async createPlano(data) {
        const { error, data: result } = await Plano.insert(data);
        if (error) throw error;
        return result;
    }

    static async getPlanoById(id) {
        const { error, data } = await Plano.getById(id);
        if (error) throw error;
        return data;
    }

    static async getAllPlano() {
        const { error, data } = await Plano.getAll();
        if (error) throw error;
        return data;
    }

    static async deletePlano(id) {
        const { error } = await Plano.delete(id);
        if (error) throw error;
        return { message: 'Plano removido com sucesso' };
    }
}

module.exports = PlanoService;