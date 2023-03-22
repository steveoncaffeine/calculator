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
let valuesList = [];
let opsList = [];

numKeys.forEach(key => {
    key.addEventListener("click", event => {
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
        valuesList.push(Number(display.textContent));
        display.textContent = "";
        opsList.push(event.target.textContent);
    })
})
