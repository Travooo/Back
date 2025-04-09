function tryParseString(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function tryParseBoolean(value) {
  if (typeof value === 'string') {
    const val = value.toLowerCase().trim();
    if (val === 'true') return true;
    if (val === 'false') return false;
  }
  return null;
}

function tryParseDate(value) {
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return null;
  return parsed;
}

function tryParseFloat(value) {
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

function tryParseInt(value) {
  const n = parseInt(value, 10);
  return isNaN(n) ? null : n;
}

module.exports = { tryParseBoolean, tryParseInt, tryParseDate, tryParseFloat, tryParseString };
