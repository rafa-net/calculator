import { calcState } from "./modules/stateManagement.js";
import * as UI from "./modules/userInterface.js";
import * as IO from "./modules/userInteraction.js";
import * as MATH from "./modules/mathOps.js";

const displayText = document.getElementById("displayText");

// Launch UI
UI.toggleDarkMode();
UI.setSizeController();

// Input getters
document.addEventListener('DOMContentLoaded', () => {
  IO.setupUserInteraction();
});


// Main computing function
function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") {
    calcState.grandTotal += MATH.add(a, b);
    return MATH.add(a, b);
  } else if (op === "-") {
    return MATH.subtract(a, b);
  } else if (op === "*") {
    calcState.grandTotal += MATH.multiply(a, b);
    return MATH.multiply(a, b);
  } else if (op === "/") {
    if (b === 0) {
      alert(`Oops! Dividing ${a} by ${b} is like trying to split zero cookies among friends—it just doesn't work. Try a different divisor.`);
      return 0;
    }
    calcState.grandTotal += divide(a, b);
    return MATH.divide(a, b);
  }
}

export { operate, displayText };

