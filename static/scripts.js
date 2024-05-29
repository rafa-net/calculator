
const numberButtons = document.querySelectorAll(".button.number");
const specialButtons = document.querySelectorAll(".button.special");
const operatorButtons = document.querySelectorAll(".button.operator");
const memoryButtons = document.querySelectorAll(".button.memory");
const displayText = document.getElementById("displayText");
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let secondNumber = null;
let lastOperator = null;
let lastSecondNumber = null;
let awaitingNewInput = null;
let repeatLastOperation = false;
let memoryNumber = "";
let numberBox = "";
let memoryRecallPressed = 0;
let memoryPlusPressed = 0;
let memoryMinusPressed = 0;
let grandTotal = 0;


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

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('color-scheme-toggle');
  toggleButton.addEventListener('click', function () {
    this.classList.toggle('dark-mode');
    const bodyElement = document.body;
    if (bodyElement.classList.contains('dark-mode') && display.classList.contains('dark-mode')) {
      bodyElement.classList.remove('dark-mode');
      bodyElement.classList.add('light-mode');
      display.classList.remove('dark-mode');
      display.classList.add('light-mode');
    } else {
      bodyElement.classList.remove('light-mode');
      bodyElement.classList.add('dark-mode');
      display.classList.remove('light-mode');
      display.classList.add('dark-mode');
    }
  });
});

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

function computeAllThree(op, a, b) {
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

document.addEventListener("DOMContentLoaded", () => {
  setupButtonListeners(numberButtons);
  setupButtonListeners(specialButtons);
  setupButtonListeners(operatorButtons);
  setupButtonListeners(memoryButtons);
  document.addEventListener('keydown', handleGlobalKeyDown);
  document.addEventListener('keyup', handleGlobalKeyUp);
});

function handleGlobalKeyDown(e) {
  console.log("Key pressed: " + e.key);
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.click();
    buttonPressed.classList.add('keyboard-active');
    displayText.classList.add(`display-blink`);
  }
}

function handleGlobalKeyUp(e) {
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.classList.remove('keyboard-active');
    displayText.classList.remove(`display-blink`);
  }
}

function setupButtonListeners(buttons) {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      handleButtonClick(button);
    });
    button.addEventListener("mousedown", () => {
      displayText.classList.add(`display-blink`);
    });
    button.addEventListener("mouseup", () => {
      displayText.classList.remove(`display-blink`);
    });
  });
}

function handleButtonClick(button) {
  console.log("Button clicked:", button.dataset.value);
  const value = button.dataset.value;

  if (button.classList.contains("number")) {
    handleNumber(value);
  } else if (button.classList.contains("special")) {
    handleSpecial(value);
  } else if (button.classList.contains("operator")) {
    handleOperator(value);
  } else if (button.classList.contains("memory")) {
    handleMemory(value);
  }
}

function handleNumber(numValue) {
  if ((numValue === "0" || numValue === "00") && displayText.innerHTML === "0") {
    return;
  }
  if (operator === "%") {
    numberBox += numValue
    displayRefresh(numberBox);
    return;
  }
  if (awaitingNewInput || repeatLastOperation) {
    numberBox = numValue;
    displayRefresh(numberBox);
    awaitingNewInput = false;
    repeatLastOperation = false;
  } else {
    numberBox += numValue;
    displayRefresh(numberBox);
  }
  if (operator && displayText.innerHTML === firstNumber && secondNumber === null) {
    numberBox = numValue;
    displayRefresh(numberBox);
  }
  if (!operator) {
    firstNumber = numberBox;
  } else {
    secondNumber = numberBox;
  }
  memoryRecallPressed = 0;
}

function handleSpecial(specialValue) {
  switch (specialValue) {
    case "AC":
      clearAll();
      break;
    case "CE":
      clearEntry();
    case "bksp":
      clearOne();
      break;
    case ".":
      if (displayText.innerHTML === "0" && !numberBox.includes(".")) {
        numberBox = "0.";
      }
      if (!numberBox.includes(".") && awaitingNewInput && firstNumber !== 0) {
        numberBox = "0.";
      }
      if (!numberBox.includes(".")) {
        numberBox += ".";
      }
      displayRefresh(numberBox);
      break;
    case "=":
      handleOperator(null);
      break;
  }
  memoryRecallPressed = 0;
}

function handleOperator(symbol) {
  if (symbol === "sqrt") {
    handleSqrtOperation();
  } else if (symbol === '%' && !operator) {
    return;
  } else if (symbol === '%' && operator !== "%" && firstNumber !== null && numberBox !== "") {
    handlePercentageOperation();
  } else if (symbol === null && repeatLastOperation) {
    handleRepeatLastOperation();
  } else {
    handleStandardOperation(symbol);
  }

  if (symbol === null) {
    repeatLastOperation = true;
  }
  awaitingNewInput = true;
  memoryRecallPressed = 0;
}

function handleMemory(memory) {
  if (memory === "GT") {
    numberBox = grandTotal;
    firstNumber = numberBox;
    displayRefresh(numberBox);
    numberBox = "";
  }
  if (memoryRecallPressed > 1) {
    memoryNumber = 0;
    memoryPlusPressed = 0;
    memoryMinusPressed = 0;
  }
  if (memory === "MR" && memoryNumber === 0) {
    firstNumber = null;
    operator = null;
    secondNumber = null;
    lastOperator = null;
    lastSecondNumber = null;
    awaitingNewInput = null;
    repeatLastOperation = false;
    memoryRecallPressed = 0;
    memoryPlusPressed = 0;
    memoryMinusPressed = 0;
    numberBox = "0";
    displayRefresh(numberBox);
  } else if (memory === "MR" && memoryNumber !== 0) {
    numberBox = memoryNumber;
    displayRefresh(numberBox);
    memoryRecallPressed++;
    return;
  }
  if (memory === "M-" && memoryNumber === 0) {
    return;
  }
  else if (memory === "M-") {
    memoryNumber = (Number(memoryNumber) - Number(numberBox));
    numberBox = memoryNumber.toString();
    return;
  }

  if (memory === "M+" && memoryPlusPressed === 0) {
    memoryNumber = numberBox;
    memoryPlusPressed++;
    numberBox = "";
  } else if (memory === "M+" && memoryPlusPressed !== 0) {
    memoryNumber = (Number(numberBox) + Number(memoryNumber));
    numberBox = memoryNumber.toString();
    memoryPlusPressed++;
  }

}


function handleSqrtOperation() {
  let result = Math.sqrt(firstNumber);
  numberBox = result.toString();
  displayRefresh(numberBox);
  firstNumber = result;
  numberBox = "";
  awaitingNewInput = true;
  operator = null;
}

function handlePercentageOperation() {
  let result = applyPercentage(operator, parseFloat(firstNumber), parseFloat(numberBox));
  grandTotal += result;
  numberBox = result.toString();
  displayRefresh(numberBox);
  firstNumber = result;
  numberBox = "";
  awaitingNewInput = true;
  operator = null;
}

function handleRepeatLastOperation() {
  let result = computeAllThree(lastOperator, firstNumber, lastSecondNumber);
  numberBox = processResult(result);
  result = numberBox;
  displayRefresh(numberBox);
  firstNumber = result;
}

function handleStandardOperation(symbol) {
  if (operator && firstNumber !== null && numberBox !== "") {
    secondNumber = numberBox;
    let result = computeAllThree(operator, firstNumber, secondNumber);
    numberBox = processResult(result);
    result = numberBox;
    displayRefresh(numberBox);
    firstNumber = result;
    lastSecondNumber = secondNumber;
    lastOperator = operator;
    numberBox = "";
  } else if (firstNumber === null && numberBox !== "") {
    firstNumber = numberBox;
    numberBox = "";
  }
  operator = symbol;
}

function processResult(result) {
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

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  awaitingNewInput = null;
  lastOperator = null;
  lastSecondNumber = null;
  repeatLastOperation = false;
  memoryNumber = 0;
  memoryRecallPressed = 0;
  memoryPlusPressed = 0;
  numberBox = "";
  displayText.innerHTML = "0";
}

function clearEntry() {
  displayText.innerHTML = "0";
  numberBox = "";
  if (operator) {
    secondNumber = null;
  } else {
    firstNumber = null;
  }
}


function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    numberBox = "";
    displayText.innerHTML = "0";
    if (operator) {
      secondNumber = null;
    } else {
      firstNumber = null;
    }
  } else {
    numberBox = displayText.innerHTML.slice(0, -1);
    if (operator) {
      secondNumber = numberBox;
    } else {
      firstNumber = numberBox;
    }
    displayRefresh(numberBox);
  }
}

function displayRefresh(value) {
  if (awaitingNewInput) {
    displayText.innerHTML = "";
    awaitingNewInput = false;
  }
  numberBox = value.toString();
  if (numberBox.length > 14) {
    numberBox = numberBox.substring(0, 14);
  }
  if (displayText.innerHTML !== numberBox) {
    displayText.innerHTML = numberBox;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('scale-slider');
  const element = document.getElementById('container');

  slider.addEventListener('input', function () {
    const scaleValue = this.value;
    element.style.transform = `scale(${scaleValue})`;
  });
});