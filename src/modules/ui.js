export function setupUserInteraction() {
  const displayDigits = document.getElementById('displayText');
  const allButtons = document.querySelectorAll(".button:not(#color-scheme-toggle)");

  allButtons.forEach(button => {
    button.addEventListener("click", event => handleUserInput(event, displayDigits));
    button.addEventListener("mousedown", () => {
      button.classList.add('keyboard-active');
      displayDigits.classList.add('display-blink');
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove('keyboard-active');
      displayDigits.classList.remove('display-blink');
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove('keyboard-active');
      displayDigits.classList.remove('display-blink');
    });
  });

  document.addEventListener('keydown', (e) => {
    const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
    if (buttonPressed) {
      buttonPressed.click();
      buttonPressed.classList.add('keyboard-active');
      displayDigits.classList.add('display-blink');
    }
  });

  document.addEventListener('keyup', (e) => {
    const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
    if (buttonPressed) {
      buttonPressed.classList.remove('keyboard-active');
      displayDigits.classList.remove('display-blink');
    }
  });
}
