const dotenv = require('dotenv').config();
const supabase = require('../config/db');

const hello = (req, res)=>{
    res.send(
        {
            message: "Hello World!"
        }
    );
};

const helloParam = (req,res)=>{
    let nome = req.params.nome;
    res.send(`Hello World, ${nome}!`);
};

const getUsers = async (req, res) => {
    try {
        let { data, error } = await supabase.from('usuario').select('*');
        res.send(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { hello, helloParam, getUsers };