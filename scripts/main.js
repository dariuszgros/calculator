const history = document.querySelector("#history");
const input = document.querySelector("#input");
const buttons = document.querySelectorAll(".symbol");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

let calculatorHistory = "";
let calculatorAnswer = "";
let action = "";
let number1 = "";
let number2 = "";

let calcHistory = "";
let calcResult = "";
let action = "";

// Calculations block
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(array) {
  let answer = 1;
  for (let i = 0; i < array.length; i++) {
    answer *= array[i];
  }
  return answer;
}

function divide(a, b) {
  if (b > 0) {
    return a / b;
  } else {
    return "Cannot divide by 0";
  }
}
function power(a, b) {
  if (b == 0) {
    return 1;
  } else {
    return a * power(a, b - 1);
  }
  //I could just use a ** b, but that's more fun
}

function roundNumber(calculation) {
  const roundedNumber = Math.round(calculation * 10000) / 10000;
  return roundNumber;
}