/* TODO: make sure the web page render: window.addEventListener("load", init, false) */

'use strict';

(function () {
    const calculator = {
        display: "0",
        firstOperand: null,
        operator: null,
        secondOperand: null,
        currentState: null,

        /*TODO: add key listener here, distinguish input type and call something like currentState.handleDigit() or
           currentState.handleClear(), let the currentState to handle the input and state transition */



        /*TODO: Maybe this function is not needed, just put the line at end of each handle input*/
        updateDisplay: function () {
            document.getElementsByClassName("calculator-screen").value = this.display;
        }
    }


    /* define a set of states*/
    const FO = {}


})();
