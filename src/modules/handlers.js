function handleSqrtOperation() {
  let result = Math.sqrt(calcState.firstNumber);
  calcState.displayValue = result.toString();
  updateDisplay(calcState.displayValue);
  calcState.firstNumber = result;
  calcState.displayValue = "";
  calcState.awaitingNewInput = true;
  calcState.operator = null;
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

function handlePercentageOperation() {
  let result = applyPercentage(calcState.operator, parseFloat(calcState.firstNumber), parseFloat(calcState.displayValue));
  calcState.grandTotal += result;
  calcState.displayValue = result.toString();
  updateDisplay(calcState.displayValue);
  calcState.firstNumber = result;
  calcState.displayValue = "";
  calcState.awaitingNewInput = true;
  calcState.operator = null;
}

function handleRepeatLastOperation() {
  let result = operate(calcState.lastOperator, calcState.firstNumber, calcState.lastSecondNumber);
  calcState.displayValue = formatResult(result);
  result = calcState.displayValue;
  updateDisplay(calcState.displayValue);
  calcState.firstNumber = result;
}

function handleStandardOperation(symbol) {
  if (calcState.operator && calcState.firstNumber !== null && calcState.displayValue !== "") {
    calcState.secondNumber = calcState.displayValue;
    let result = operate(calcState.operator, calcState.firstNumber, calcState.secondNumber);
    calcState.displayValue = formatResult(result);
    result = calcState.displayValue;
    updateDisplay(calcState.displayValue);
    calcState.firstNumber = result;
    calcState.lastSecondNumber = calcState.secondNumber;
    calcState.lastOperator = calcState.operator;
    calcState.displayValue = "";
  } else if (calcState.firstNumber === null && calcState.displayValue !== "") {
    calcState.firstNumber = calcState.displayValue;
    calcState.displayValue = "";
  }
  calcState.operator = symbol;
}