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
      min: 1,
      max: 255,
      formato: regexNome,
      erro: "O nome do serviço pode conter apenas letras, números e underline.",
    },
    sobre: {
      tipo: "string",
      required: true,
      atributo: "sobre",
      min: 10,
      max: 475,
    },
    endereco: {
      tipo: "string",
      required: true,
      atributo: "endereco",
      min: 3,
      max: 65,
    },
    tipo: {
      tipo: "string",
      required: true,
      atributo: "tipo",
      min: 1,
      max: 20,
    },
    /*cep: {
      tipo: "string",
      required: true,
      atributo: "cep",
      min: 8,
      max: 8,
    },*/
    lat: {
      tipo: "number",
      required: false,
      atributo: "lat",
      min: -90,
      max: 90,
      casasDecimais: 8,
    },
    lng: {
      tipo: "number",
      required: false,
      atributo: "lng",
      min: -180,
      max: 180,
      casasDecimais: 8,
    },
    horarios: {
      tipo: "string",
      required: true, 
      atributo: "horarios",
      min: 5,
      max: 255,
    },
  };  
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Servico;
