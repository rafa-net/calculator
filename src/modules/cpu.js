function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") {
    calcState.grandTotal += add(a, b);
    return add(a, b);
  } else if (op === "-") {
    return subtract(a, b);
  } else if (op === "*") {
    calcState.grandTotal += multiply(a, b);
    return multiply(a, b);
  } else if (op === "/") {
    if (b === 0) {
      alert(`Oops! Dividing ${a} by ${b} is like trying to split zero cookies among friends—it just doesn't work. Try a different divisor.`);
      return 0;
    }
    calcState.grandTotal += divide(a, b);
    return divide(a, b);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function percentage(a, b) {
  return (100 * a) / b;
}