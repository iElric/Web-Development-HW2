(function () {
    'use strict';

    /* define a set of states, all of them should have same functions to implement polymorphism */
    function CalcFirstOperandState(calc) {
        this.calc = calc;
        this.handleOperand = function (digit) {
            this.calc.firstOperand += digit;
            this.calc.display = this.calc.firstOperand;
        };

        this.handleDot = function (dot) {
            this.calc.firstOperand += dot;
            this.calc.display = this.calc.firstOperand;
            this.calc.currentState = this.calc.calcFirstOperandDecimalState;
        }

    }


    function CalcFirstOperandDecimalState(calc) {
    }

    function CalcOperatorState(calc) {
    }

    function CalcSecondOperandState(calc) {
    }

    function CalcSecondOperandDecimalState(calc) {
    }

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

        /*TODO: Maybe this function is not needed, just put the line at end of each handle input*/
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

        this.getInput = function () {
            /* save this reference */
            const that = this;

            /* This is an HTML collection objects*/
            let digitButtons = document.getElementsByClassName("digit");
            /* use Array.from() convert HTML Collections to array to use forEach */
            /* For digit buttons*/
            Array.from(digitButtons).forEach(db => {
                db.addEventListener("click", event => {
                    that.currentState.handleOperand(db.value);
                    that.updateDisplay();
                })
            })

            /* For dot */
            let dots = document.getElementsByClassName("dot");
            Array.from(dots).forEach(dot => {
                dot.addEventListener("click", event => {
                    that.currentState.handleDot(dot.value);
                    that.updateDisplay();
                })
            })


        }
    }


    window.addEventListener("load", (event) => {
        const calculator = new Calculator();
        calculator.getInput()
    }, false);


})();
