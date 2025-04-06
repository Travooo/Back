function tryParseInt(value) {
  const n = parseInt(value, 10);
  return isNaN(n) ? null : n;
}

function tryParseFloat(value) {
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

function tryParseDate(value) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function tryParseBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const val = value.toLowerCase().trim();
    if (val === "true" || val === "1") return true;
    if (val === "false" || val === "0") return false;
  }
  if (typeof value === "number") return value === 1;
  return null;
}

function tryParseString(value) {
  if (value === null || value === undefined) return null;
  return String(value);
}

module.exports = {
  tryParseInt,
  tryParseFloat,
  tryParseDate,
  tryParseBoolean,
  tryParseString,
};
