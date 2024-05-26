export function formatResult(result) {
  if (Number.isInteger(result)) {
    if (String(result).length > 14) {
      let processedInteger = result.toString();
      processedInteger = processedInteger.substring(0, 14);
      return processedInteger;
    }
    return result.toString();
  } else {
    let resultString = result.toString();
    let [integerPart, fractionalPart] = resultString.split(".");
    fractionalPart = fractionalPart || "";
    let maxDecimalPlaces = 13 - (integerPart.length);
    if (maxDecimalPlaces < 0) {
      maxDecimalPlaces = 0;
    }
    return result.toFixed(maxDecimalPlaces);
  }
}