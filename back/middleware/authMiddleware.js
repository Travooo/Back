//EXEMPLO DE MIDDLEWARE DE AUTENTIFICAÇÃO COM JWT GERADO PELO CHATGPT:

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Você pode armazenar as informações do usuário decodificadas no objeto `req`
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;