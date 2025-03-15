const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Agendamento {
    constructor(id_agendamento = null, id_estabelecimento, id_usuario, horario, mesa = null) {
        this.id_agendamento = id_agendamento;
        this.id_estabelecimento = id_estabelecimento;
        this.id_usuario = id_usuario;
        this.horario = horario;
        this.mesa = mesa;
    }
}

module.exports = Agendamento;