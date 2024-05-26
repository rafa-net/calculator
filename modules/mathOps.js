function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") {
    grandTotal += add(a, b);
    return add(a, b);
  } else if (op === "-") {
    return subtract(a, b);
  } else if (op === "*") {
    grandTotal += multiply(a, b);
    return multiply(a, b);
  } else if (op === "/") {
    if (b === 0) {
      alert(`Oops! Dividing ${a} by ${b} is like trying to split zero cookies among friends—it just doesn't work. Try a different divisor.`);
      return 0;
    }
    grandTotal += divide(a, b);
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

function power(a, b) {
  return a ** b;
}

function percentage(a, b) {
  return (100 * a) / b;
}

function applyPercentage(operator, baseValue, percentageValue) {
  let result;
  let percentageDecimal = percentageValue / 100;
  switch (operator) {
    case '+':
    case '-':
      result = baseValue * percentageDecimal;
      return operator === '-' ? baseValue - result : baseValue + result;
    case '*':
      result = baseValue * percentageDecimal;
      return result;
    case '/':
      result = baseValue / percentageDecimal;
      return result;
    default:
      return;
  }
}

function handleSqrtOperation() {
  let result = Math.sqrt(firstNumber);
  displayValue = result.toString();
  updateDisplay(displayValue);
  firstNumber = result;
  displayValue = "";
  awaitingNewInput = true;
  operator = null;
}

function handlePercentageOperation() {
  let result = applyPercentage(operator, parseFloat(firstNumber), parseFloat(displayValue));
  grandTotal += result;
  displayValue = result.toString();
  updateDisplay(displayValue);
  firstNumber = result;
  displayValue = "";
  awaitingNewInput = true;
  operator = null;
}

function handleRepeatLastOperation() {
  let result = operate(lastOperator, firstNumber, lastSecondNumber);
  displayValue = formatResult(result);
  result = displayValue;
  updateDisplay(displayValue);
  firstNumber = result;
}

function handleStandardOperation(symbol) {
  if (operator && firstNumber !== null && displayValue !== "") {
    secondNumber = displayValue;
    let result = operate(operator, firstNumber, secondNumber);
    displayValue = formatResult(result);
    result = displayValue;
    updateDisplay(displayValue);
    firstNumber = result;
    lastSecondNumber = secondNumber;
    lastOperator = operator;
    displayValue = "";
  } else if (firstNumber === null && displayValue !== "") {
    firstNumber = displayValue;
    displayValue = "";
  }
  operator = symbol;
}