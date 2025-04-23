const { validateNumber, validateDate } = require('../utils/validators')

class LocalVisitado {
  static #schema = {
    // #: Privado
    estabelecimento_id: {
      tipo: 'number',
      required: true,
      atributo: 'estabelecimento_id',
    },
    usuario_id: {
      tipo: 'number',
      required: true,
      atributo: 'usuario_id',
    },
    data_visita: {
      tipo: 'date',
      required: true,
      atributo: 'data_nascimento',
    },
  }
  constructor(data = {}) {
    for (const key in LocalVisitado.#schema) {
      const rule = LocalVisitado.#schema[key]
      const valor = data[key]
      if (valor === undefined || valor === null || valor === '') {
        if (rule.required) {
          throw new Error(`Atributo obrigatório '${key}' ausente.`)
        }
        this[key] = null
      } else {
        this[key] = LocalVisitado.#validate(valor, key)
      }
    }
  }
  static #validate(value, key) {
    const rule = this.#schema[key]
    if (!rule) return null
    const { tipo, atributo = key, erro, ...rest } = rule
    switch (tipo) {
      case 'number':
        return validateNumber(value, atributo)
      case 'date':
        return validateDate(value, atributo)
      default:
        throw new Error(`Tipo de validação '${tipo}' não reconhecido para '${key}'`)
    }
  }
  // Método auxiliar (pode ser exportado para outras camadas)
  static validateBySchema(data = {}) {
    const validados = {}
    for (const key in data) {
      if (key in this.#schema) {
        validados[key] = this.#validate(data[key], key)
      }
    }
    return validados
  }
  static getValidKeys() {
    return Object.keys(this.#schema)
  }
  toJSON() {
    const json = {}
    for (const key of LocalVisitado.getValidKeys()) {
      json[key] = this[key]
    }
    return json
  }
}

module.exports = LocalVisitado
