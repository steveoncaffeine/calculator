function add (num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default: return 'unknown op';
    }
}

let numKeys = document.querySelectorAll(".num");
let cancel = document.querySelector(".cancel");
let display = document.querySelector(".display");
let ops = document.querySelectorAll(".op");
let calc = document.querySelector(".equal");
let currentOp = "";
let valuesList = [];
let opsList = [];
let opChange = false;

numKeys.forEach(key => {
    key.addEventListener("click", event => {
        ops.forEach(op => op.style.backgroundColor = "rgb(9, 189, 150)");
        if (isNaN(display.textContent) || display.textContent === "0") {
            display.textContent = "";
        }
        if (opChange === true) {
            opsList.push(currentOp);
            opChange = false;
        }
        if (display.textContent.length <= 9) {
            if (event.target.textContent.includes(".")) {
                if (display.textContent === "") {
                    display.textContent = "0.";
                }
                else if (!display.textContent.includes(".")) {
                    display.textContent = display.textContent + ".";
                }
            }
            else {
                display.textContent = display.textContent + event.target.textContent;
            }
        }
    });
});

ops.forEach(op => {
    op.addEventListener("click", event => {
        ops.forEach(op => op.style.backgroundColor = "rgb(9, 189, 150)");
        if (display.textContent != "") valuesList.push(Number(display.textContent));
        if (valuesList.length !== 0) {
            display.textContent = "";
            currentOp = event.target.textContent;
            event.target.style.backgroundColor = "rgb(5, 110, 88)";
            opChange = true;
        }
    });
});

calc.addEventListener("click", () => {
    if (display.textContent != "") valuesList.push(Number(display.textContent));
    let value = valuesList[0];
    if (opsList.length !== 0) {
        for (let i = 0; i < opsList.length; i++) {
            value = operate(opsList[i], value, valuesList[i + 1]);
        }
    }
    let valStr = value.toString();
    if (valStr.length > 9) {
        if (valStr.includes(".")) {
            value = value.toFixed(Math.abs(9 - valStr.split(".")[0].length));
        }
        else {
            value = value.toExponential();
        }
    }
    display.textContent = value;
    if (valStr === "Infinity" || valStr === "-Infinity") {
        display.textContent = "Math error";
    }
    valuesList.length = 0;
    opsList.length = 0;
    currentOp = "";
});

cancel.addEventListener("click", () => {
    valuesList.length = 0;
    opsList.length = 0;
    currentOp = "";
    display.textContent = "";
})