const { validateString, validateOption, validateDate, validateFoto } = require('../validators');

function validateBySchema(data, schema) {
  const result = {};
  for (const key in schema) {
    if (key in data) {
      const rule = schema[key];
      const valor = data[key];
      switch (rule.tipo) {
        case 'string':
          result[key] = validateString(valor, {
            atributo: key,
            ...rule,
          });
          break;
        case 'option':
          result[key] = validateOption(valor, key);
          break;
        case 'date':
          result[key] = validateDate(valor, key);
          break;
        case 'foto':
          result[key] = validateFoto(valor);
          break;
        default:
          throw new Error(`Validação desconhecida para o atributo: ${rule.tipo}`);
      }
    }
  }
  return result;
}

module.exports = validateBySchema;
