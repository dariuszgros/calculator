let calcHistory = "";
let calcResult = "";
let action = "";

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
  if (b == 0) {
    return 1;
  } else {
    return (a * power(a, b - 1));
  }
  //I could just use a ** b, but that's more fun
}
