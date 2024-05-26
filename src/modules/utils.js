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

function setSizeController() {
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('scale-slider');
    const element = document.getElementById('container');

    slider.addEventListener('input', function () {
      const scaleValue = this.value;
      element.style.transform = `scale(${scaleValue})`;
    });
  });
}

function formatResult(result) {
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