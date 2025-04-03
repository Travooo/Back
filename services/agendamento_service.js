const Agendamento = require('../model/Agendamento');
const supabase = require('../config/db');

class AgendamentoService {
    static async criar(agendamento) {
        const { data, error } = await supabase
            .from('agendamento')
            .insert([{ 
                id_estabelecimento: agendamento.id_estabelecimento,
                id_usuario: agendamento.id_usuario,
                horario: agendamento.horario,
                mesa: agendamento.mesa
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('agendamento')
            .select()
            .eq('id_agendamento', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('agendamento').select();
        if (error) throw error;
        return data;
    }

    static async atualizar(id, agendamento) {
        const { data, error } = await supabase
            .from('agendamento')
            .update({
                id_estabelecimento: agendamento.id_estabelecimento,
                id_usuario: agendamento.id_usuario,
                horario: agendamento.horario,
                mesa: agendamento.mesa
            })
            .eq('id_agendamento', id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('agendamento').delete().eq('id_agendamento', id);
        if (error) throw error;
        return { message: 'Agendamento removido com sucesso.' };
    }
}

module.exports = AgendamentoService;