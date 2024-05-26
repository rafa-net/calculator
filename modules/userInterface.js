function toggleDarkMode() {
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
}

function setSizeControl() {
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('scale-slider');
    const element = document.getElementById('container');

    slider.addEventListener('input', function () {
      const scaleValue = this.value;
      element.style.transform = `scale(${scaleValue})`;
    });
  });
}

function addDigitBlink() {
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('button:not(#theme-toggle)');
    buttons.forEach(button => {
      button.addEventListener("mousedown", () => {
        const displayText = document.getElementById('display');
        displayText.classList.add(`display-blink`);
      });
      button.addEventListener("mouseup", () => {
        const displayText = document.getElementById('display');
        displayText.classList.remove(`display-blink`);
      });

    });
  });
}
