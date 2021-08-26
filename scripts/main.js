const history = document.querySelector("#history");
const input = document.querySelector("#input");
const buttons = document.querySelectorAll(".symbol");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

let calculatorHistory = "";
let calculatorResult = "";
let action = "";
let number1 = "";
let number2 = "";

// Calculations block
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b > 0) {
    return a / b;
  } else {
    return "Cannot divide by 0";
  }
}

function power(a, b) {
  return Math.pow(a, b);
}

function roundNumber(calculation) {
  const roundedNumber = Math.round(calculation * 10000) / 10000;
  return roundedNumber;
}

function calculate(task, firstNumber, secondNumber) {
  if (task === "power") {
    calculatorResult = power([+firstNumber, +secondNumber]);
  } else if (task === "multiply") {
    calculatorResult = multiply(+firstNumber, +secondNumber);
  } else if (task === "add") {
    calculatorResult = add(+firstNumber, +secondNumber);
  } else if (task === "divide") {
    calculatorResult = divide(+firstNumber, +secondNumber);
  } else if (task === "substract") {
    calculatorResult = substract(+firstNumber, +secondNumber);
  }
  action = "";
  number1 = "";
  number2 = "";
  if (calculatorResult !== "Cannot divide by 0") {
    return roundNumber(calculatorResult);
  }
  return calculatorResult;
}

function setOperatorsState(state) {
  operators.forEach((operator) => {
    if (
      state === "disable" ||
      calculatorResult === "Cannot divide by 0" ||
      calculatorResult === Infinity
    ) {
      operator.setAttribute("disabled", "");
    } else if (state === "enable") {
      operator.removeAttribute("disabled", "");
    }
  });
}

function setEqualsButtonState(state) {
  if (action === "" || state === "disable") {
    equals.setAttribute("disabled", "");
  } else {
    equals.removeAttribute("disabled", "");
  }
}

function operate(button) {
  decimal.removeAttribute("disabled", "");
  if (number1 === "") {
    number1 = input.textContent;
    action = button.id;
  } else if (number1 !== "" && action !== "") {
    number2 = input.textContent;
    history.textContent = showCalculation(action);
    number1 = calculate(action, number1, number2);
    action = button.id;
  }
  setOperatorsState("disable");
  setEqualsButtonState("disable");
  input.textContent = "";
}

function showNumbers(button) {
  if (
    action === "equals" ||
    calculatorResult === "Cannot divide by 0" ||
    calculatorResult === Infinity
  ) {
    clearMyDisplay("clear");
  }
  if (input.textContent === "0") {
    input.textContent = button.textContent;
  } else {
    input.textContent += button.textContent;
  }
  setEqualsButtonState();
  setOperatorsState("enable");
}

function showDecimals(button) {
  if (calculatorResult !== "" && action === "equals") {
    clearMyDisplay("clear");
    input.textContent += button.textContent;
  } else if (input.textContent === "" || input.textContent === ".") {
    input.textContent = button.textContent;
  } else if (input.textContent !== "" && input.textContent.includes(".")) {
    button.setAttribute("disabled", "");
  } else {
    input.textContent += button.textContent;
  }
}

function showCalculation(symbol) {
  if (symbol === "power") {
    calculatorHistory = `${number1}^${number2}=${calculate(
      action,
      number1,
      number2
    )}`;
  } else if (symbol === "multiply") {
    calculatorHistory = `${number1}×${number2}=${calculate(
      action,
      number1,
      number2
    )}`;
  } else if (symbol === "add") {
    calculatorHistory = `${number1}+${number2}=${calculate(
      action,
      number1,
      number2
    )}`;
  } else if (symbol === "divide") {
    calculatorHistory = `${number1}÷${number2}=${calculate(
      action,
      number1,
      number2
    )}`;
  } else if (symbol === "substract") {
    calculatorHistory = `${number1}-${number2}=${calculate(
      action,
      number1,
      number2
    )}`;
  }
  return calculatorHistory;
}

function listenButtons() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("number")) {
        showNumbers(button);
      } else if (button.classList.contains("operator")) {
        operate(button);
      } else if (button.id === "decimal") {
        showDecimals(button);
      } else if (button.id === "equals") {
        operate(button);
        setOperatorsState("enable");
      } else if (button.id === "clear") {
        clearMyDisplay("clear");
      } else if (button.id === "back") {
        clearMyDisplay("back");
      }
    });
  });

  function clearMyDisplay(task) {
    if (task === "clear") {
      setOperatorsState("enable");
      decimal.removeAttribute("disabled", "");
      equals.removeAttribute("disabled", "");
      history.textContent = "";
      input.textContent = "";
      calculatorHistory = "";
      calculatorResult = "";
      action = "";
      number1 = "";
      number2 = "";
    } else if (task === "back") {
      input.textContent = input.textContent.slice(0, -1);
      if (!input.textContent.includes(".")) {
        decimal.removeAttribute("disabled", "");
      }
    }
  }

  // Keyboard
  const operatorsObj = {
    "^": "power",
    "/": "divide",
    "*": "multiply",
    "-": "subtract",
    "+": "add",
  };
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.getElementById("clear").click();
    } else if (event.key === "Backspace") {
      document.getElementById("back").click();
    } else if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("equals").click();
    } else if (event.key === ".") {
      document.getElementById("decimal").click();
    } else if (event.key in operatorsObj) {
      document.getElementById(operatorsObj[event.key]).click();
    } else if (!Number.isNaN(event.key)) {
      document.getElementById(`number-${event.key}`).click();
    }
  });
}
listenButtons();
