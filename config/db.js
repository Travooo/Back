require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.URL,
    process.env.APIKEY
);

console.log('✅ Supabase Client carregado com sucesso!');

module.exports = supabase;
