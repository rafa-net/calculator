import { handleNumber } from "./inputs/number.js";
import { handleSpecial } from "./inputs/special.js";
import { handleOperator } from "./inputs/operator.js";
import { handleMemory } from "./inputs/memory.js";

export function handleUserInput(e) {
  const target = e.target;
  const value = target.dataset.value;

  if (target.classList.contains("number")) {
    handleNumber(value);
  } else if (target.classList.contains("special")) {
    handleSpecial(value);
  } else if (target.classList.contains("operator")) {
    handleOperator(value);
  } else if (target.classList.contains("memory")) {
    handleMemory(value);
  }
}