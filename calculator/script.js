// --- Basic math functions ---
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

// Take an operator string and two numbers, return the result.
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

// --- Calculator state ---
let firstNumber = null; // the stored operand
let currentOperator = null; // the pending operator
let shouldResetDisplay = false; // start fresh after an operator/equals

const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value;
}

// Round long results so they fit the display.
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function inputNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    updateDisplay(number);
    shouldResetDisplay = false;
  } else {
    updateDisplay(display.textContent + number);
  }
}

function inputDecimal() {
  if (shouldResetDisplay) {
    updateDisplay("0.");
    shouldResetDisplay = false;
    return;
  }
  if (!display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  const secondNumber = Number(display.textContent);

  if (currentOperator === "/" && secondNumber === 0) {
    updateDisplay("Nice try 🙃");
    firstNumber = null;
    currentOperator = null;
    shouldResetDisplay = true;
    return;
  }

  const result = roundResult(operate(currentOperator, firstNumber, secondNumber));
  updateDisplay(result);
  firstNumber = result;
  currentOperator = null;
  shouldResetDisplay = true;
}

function handleOperator(operator) {
  // Chain operations: evaluate what's pending before storing the new operator.
  if (currentOperator !== null && !shouldResetDisplay) {
    evaluate();
  } else {
    firstNumber = Number(display.textContent);
  }

  currentOperator = operator;
  shouldResetDisplay = true;
}

function clear() {
  firstNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay("0");
}

function deleteLast() {
  if (shouldResetDisplay) return;
  const text = display.textContent;
  updateDisplay(text.length > 1 ? text.slice(0, -1) : "0");
}

// --- Wire up the buttons ---
document.querySelector(".buttons").addEventListener("click", (event) => {
  const button = event.target;
  if (button.tagName !== "BUTTON") return;

  if (button.dataset.number !== undefined) {
    inputNumber(button.dataset.number);
  } else if (button.dataset.operator !== undefined) {
    handleOperator(button.dataset.operator);
  } else {
    switch (button.dataset.action) {
      case "decimal":
        inputDecimal();
        break;
      case "equals":
        evaluate();
        break;
      case "clear":
        clear();
        break;
      case "delete":
        deleteLast();
        break;
    }
  }
});

// --- Keyboard support ---
window.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    inputNumber(key);
  } else if (key === ".") {
    inputDecimal();
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    evaluate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clear();
  }
});
