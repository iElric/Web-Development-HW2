(function () {
    'use strict';

    /* define 5 states, all of them should have same functions to implement polymorphism */

    function CalcFirstOperandState(calc) {
        this.calc = calc;
        this.handleDigit = function (digit) {
            /* avoid screen show "00003" */
            if (!this.calc.firstOperand && digit === '0') {
                return;
            }
            this.calc.firstOperand += digit;
            this.calc.display = this.calc.firstOperand;
            this.calc.updateDisplay();
        };

        this.handleDot = function (dot) {
            /* screen should show "0.3" rather than ".3" */
            if (!this.calc.firstOperand) {
                this.calc.firstOperand += "0";
            }
            this.calc.firstOperand += dot;
            this.calc.display = this.calc.firstOperand;
            this.calc.updateDisplay();
            this.calc.currentState = this.calc.calcFirstOperandDecimalState;
        };

        this.handleOperator = function (operator) {
            this.calc.operator = operator;
            this.calc.currentState = this.calc.calcOperatorState;
        }
    }

    function CalcFirstOperandDecimalState(calc) {
        this.calc = calc;
        this.handleDigit = function (digit) {
            this.calc.firstOperand += digit;
            this.calc.display = this.calc.firstOperand;
            this.calc.updateDisplay();
        };

        this.handleDot = function (dot) {
            /* do nothing */
        };

        this.handleOperator = function (operator) {
            this.calc.operator = operator;
            this.calc.currentState = this.calc.calcOperatorState;
        }
    }

    function CalcOperatorState(calc) {
        this.calc = calc;
        this.handleDigit = function (digit) {
            this.calc.secondOperand += digit;
            this.calc.display = this.calc.secondOperand;
            this.calc.updateDisplay();
            this.calc.currentState = this.calc.calcSecondOperandState;
        };

        this.handleDot = function (dot) {
            this.calc.secondOperand += "0";
            this.calc.secondOperand += dot;
            this.calc.display = this.calc.secondOperand;
            this.calc.updateDisplay();
            this.calc.currentState = this.calc.calcSecondOperandDecimalState;
        };

        this.handleOperator = function (operator) {
            /* update operator */
            this.calc.operator = operator;
        }
    }

    function CalcSecondOperandState(calc) {
        this.calc = calc;
        this.handleDigit = function (digit) {
            /* avoid screen show "00003" */
            if (!this.calc.secondOperand && digit === '0') {
                return;
            }
            this.calc.secondOperand += digit;
            this.calc.display = this.calc.secondOperand;
            this.calc.updateDisplay();
        };

        this.handleDot = function (dot) {
            if (!this.calc.secondOperand) {
                this.calc.secondOperand += "0";
            }
            this.calc.secondOperand += dot;
            this.calc.display = this.calc.secondOperand;
            this.calc.updateDisplay();
            this.calc.currentState = this.calc.calcSecondOperandDecimalState;
        };

        this.handleOperator = function (operator) {
            this.calc.firstOperand = this.calc.arithmetic();
            this.calc.operator = operator;
            this.calc.secondOperand = "";
            this.calc.display = this.calc.firstOperand;
            this.calc.updateDisplay();
            this.calc.currentState = this.calc.calcOperatorState;

        }
    }

    function CalcSecondOperandDecimalState(calc) {
        this.calc = calc;
        this.handleDigit = function (digit) {
            this.calc.secondOperand += digit;
            this.calc.display = this.calc.secondOperand;
            this.calc.updateDisplay();
        };

        this.handleDot = function (dot) {
            /* do nothing*/
        };

        this.handleOperator = function (operator) {
            this.calc.firstOperand = this.calc.arithmetic();
            this.calc.operator = operator;
            this.calc.secondOperand = "";
            this.calc.display = this.calc.firstOperand;
            this.calc.updateDisplay();
            this.calc.currentState = this.calc.calcOperatorState;
        }
    }

    /* The calculator object which only responsible for listen for clicks and pass the input to its currentState, let
    *  currentState to handle the rest of work. */
    function Calculator() {
        this.calcFirstOperandState = new CalcFirstOperandState(this);
        this.calcFirstOperandDecimalState = new CalcFirstOperandDecimalState(this);
        this.calcOperatorState = new CalcOperatorState(this);
        this.calcSecondOperandState = new CalcSecondOperandState(this);
        this.calcSecondOperandDecimalState = new CalcSecondOperandDecimalState(this);

        this.display = "0";
        this.firstOperand = "";
        this.operator = null;
        this.secondOperand = "";
        this.currentState = this.calcFirstOperandState;

        this.updateDisplay = function () {
            const s = document.getElementsByClassName("calculator-screen").item(0)
            s.value = this.display;
        };

        this.clear = function () {
            this.display = "0";
            this.firstOperand = "";
            this.operator = null;
            this.secondOperand = "";
            this.currentState = this.calcFirstOperandState;
        };


        /* do math */
        this.arithmetic = function () {
            switch (this.operator) {
                case "+":
                    /* should return a string*/
                    return Number(this.firstOperand) + Number(this.secondOperand) + "";
                case "-":
                    return this.firstOperand - this.secondOperand;
                case "*":
                    return this.firstOperand * this.secondOperand;
                case "/":
                    return this.firstOperand / this.secondOperand
            }

        }

        this.getInput = function () {
            /* save this reference */
            const that = this;

            /* For digit buttons*/
            /* This is an HTML collection objects*/
            let digitButtons = document.getElementsByClassName("digit");
            /* use Array.from() convert HTML Collections to array to use forEach */
            Array.from(digitButtons).forEach(db => {
                db.addEventListener("click", event => {
                    that.currentState.handleDigit(db.value);
                })
            })

            /* For dot */
            let dots = document.getElementsByClassName("dot");
            Array.from(dots).forEach(dot => {
                dot.addEventListener("click", event => {
                    that.currentState.handleDot(dot.value);
                })
            })

            /* For operators */
            let operators = document.getElementsByClassName("operator");
            Array.from(operators).forEach(operator => {
                operator.addEventListener("click", event => {
                    that.currentState.handleOperator(operator.value);
                })
            })

            /* For clear */
            let clears = document.getElementsByClassName("clear");
            Array.from(clears).forEach(clear => {
                clear.addEventListener("click", event => {
                    that.clear();
                    that.updateDisplay();
                })
            })


        }
    }


    /* run calculator */
    window.addEventListener("load", (event) => {
        const calculator = new Calculator();
        calculator.getInput()
    }, false);


})();
