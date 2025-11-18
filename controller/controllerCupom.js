const cupomService = require('../services/cupom_service');
const CupomCliente = require('../model/CupomCliente');
const Cupom = require('../model/Cupom');
const { validateCupom } = require('../validators/cupomValidator');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const getCuponsAll = async (req, res) => {//esse é um endpoint para pegar todos os cupons da tabela cupons
    try {
        const data = await cupomService.getAllCupons();

        const cupons = data.map(u => new Cupom({
            id: u.id,
            estabelecimento_id: u.estabelecimento_id,
            organizacao_id: u.organizacao_id,
            descricao: u.descricao,
            expiration: u.expiration,
            created_at: u.created_at,
            nome: u.nome
        }));

        res.status(200).json(cupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCupons = async (req, res) => { //esse é um endpoint para pegar todos os cupons da tabela cupom_cliente
    try {
        const data = await cupomService.getAllCuponsClient();

        const cupons = data.map(u => new CupomCliente({
            id: u.id,
            resgatado_em: u.resgatado_em,
            cupom_id: u.cupom_id,
            usuario_id: u.usuario_id,
            status_ativo: u.status_ativo,
            codigo: u.codigo
        }));

        res.status(200).json(cupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCupons = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });

        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, SECRET_KEY);

        const organizacaoId = decoded.id;

        const data = await cupomService.getCuponsByOrganizacao(organizacaoId);
        const cupons = data.map(u => new Cupom({
            id: u.id,
            estabelecimento_id: u.estabelecimento_id,
            descricao: u.descricao,
            expiration: u.expiration,
            created_at: u.created_at,
            nome: u.nome
        }));

        res.status(200).json(cupons);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}


const getCupomById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await cupomService.getCupomById(id);
        if (!data) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }
        const cupom = new Cupom({
            id: data.id,
            estabelecimento_id: data.estabelecimento_id,
            descricao: data.descricao,
            expiration: data.expiration,
            created_at: data.created_at,
            nome: data.nome
        })
        res.status(200).json(cupom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createCupom = async (req, res) => {
    try {
        const validationErrors = validateCupom(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const {nome, estabelecimento_id, descricao, expiration} = req.body;
        const novoCupom = new Cupom({
            nome,
            estabelecimento_id, 
            descricao,
            expiration
        })
        const result = await cupomService.createCupom(novoCupom);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCupom = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cupomService.deleteCupom(id);

        if (!result) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCupom = async (req, res) => {
    try {
        const validationErrors = validateCupom(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const { id } = req.params;
        const {nome, estabelecimento_id, descricao, expiration} = req.body;
        const cupomAtualizado = new Cupom({
            nome,
            estabelecimento_id,  
            expiration,
            descricao
        })
        const result = await cupomService.updateCupom(id, cupomAtualizado);
        if (!result) {
            return res.status(404).json({ message: "Cupom não encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const claimCupom = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);

        const usuarioId = decoded.id;
        const { id } = req.params;

        const data = await cupomService.claimCupomForUser(id, usuarioId);

        const cupomCliente = new CupomCliente({
            id: data.id,
            resgatado_em: data.resgatado_em,
            cupom_id: data.cupom_id,
            usuario_id: data.usuario_id,
            status_ativo: data.status_ativo,
            codigo: data.codigo
        });

        return res.status(201).json(cupomCliente);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const validarCupom = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);

        const organizacaoId = decoded.id;
        const { codigo } = req.body;

        if (!codigo) {
            return res.status(400).json({ message: "Código do cupom é obrigatório." });
        }

        const { cupom, cupomCliente } = await cupomService.validarCupomPorCodigo(
            codigo,
            organizacaoId
        );

        return res.status(200).json({
            valido: true,
            mensagem: 'Cupom aplicado com sucesso',
            cupom: {
                id: cupom.id,
                estabelecimento_id: cupom.estabelecimento_id,
                descricao: cupom.descricao,
                nome: cupom.nome,
                expiration: cupom.expiration
            },
            uso: {
                id: cupomCliente.id,
                resgatado_em: cupomCliente.resgatado_em,
                status_ativo: cupomCliente.status_ativo,
                codigo: cupomCliente.codigo
            }
        });
    } catch (error) {
        return res.status(400).json({
            valido: false,
            mensagem: error.message
        });
    }
};


module.exports = { getAllCupons, getCupons, getCupomById, createCupom, deleteCupom, updateCupom, getCuponsAll, claimCupom, validarCupom };
