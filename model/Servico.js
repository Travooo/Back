const ModeloBase = require("./ModeloBase");

const regexNome = /^[\p{L}0-9 _\-.',&()@]+$/u;

class Servico extends ModeloBase {
  static #schema = {
    usuario_organizacao_id: {
      tipo: "number",
      required: true,
      atributo: "usuario_organizacao_id",
    },
    nome: {
      tipo: "string",
      required: true,
      atributo: "nome",
      min: 4,
      max: 30,
      formato: regexNome,
      erro: "O nome do serviço pode conter apenas letras, números e underline.",
    },
    sobre: {
      tipo: "string",
      required: true,
      atributo: "sobre",
      min: 10,
      max: 300,
    },
    endereco: {
      tipo: "string",
      atributo: "endereco",
      min: 10,
      max: 150,
    },
    horarios: {
      tipo: "string",
      required: true,
      atributo: "horarios",
      min: 10,
      max: 100,
    },
    foto: {
      tipo: "foto",
      atributo: "foto_perfil",
      tiposPermitidos: ["image/jpeg", "image/png"],
      tamanhoMaxMB: 3,
    },
    tipo: {
      tipo: "string",
      required: true,
      atributo: "tipo",
      min: 1,
      max: 20,
    },
    lat: {
      tipo: "number",
      required: false,
      atributo: "lat",
      minimo: -90,
      maximo: 90,
      casasDecimais: 8,
    },
    lng: {
      tipo: "number",
      required: false,
      atributo: "lng",
      minimo: -180,
      maximo: 180,
      casasDecimais: 8,
    },

    anexo_id: {
      tipo: "number",
      required: false,
      atributo: "usuario_organizacao_id",
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Servico;
