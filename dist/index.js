/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Invest.js":
/*!***********************!*\
  !*** ./src/Invest.js ***!
  \***********************/
/*! exports provided: Invest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invest", function() { return Invest; });
class Invest {
    constructor(investAmount = 0, passedTime = 0) {
        this.investAmount = investAmount;
        this.passedTime = passedTime
    }
}

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Invest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invest */ "./src/Invest.js");
/* harmony import */ var _password__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./password */ "./src/password.js");




const inputInvestAmount = document.querySelector('.changes-form__input-invest-amount')
const inputInvestTime = document.querySelector('.changes-form__input-invest-time')
const inputEuroPrice = document.querySelector('.changes-form__input-euro-price')
const inputSix = document.getElementById('six')
const inputTwelve = document.getElementById('twelve')
const startButton = document.querySelector('.changes-form--button-submit')
const inputYes = document.getElementById('yes')
const inputNo = document.getElementById('no')
const investTimeSection = document.querySelector('.invest-time')

let startInvestBox = new _Invest__WEBPACK_IMPORTED_MODULE_0__["Invest"]()
const reInvestBoxArray = []

let dailyIncome = 0
let balance = 0
let multiplier = 0
let boxTime = 0
let euroPrice = 0
let reinvestTime = 0
let timeToEnd = 0
let weekDayIterator = 0
let totalTime = 0

const calcInvestEUR = () => {
    const investAmountPLN = inputInvestAmount.value
    reinvestTime = inputInvestTime.value
    euroPrice = inputEuroPrice.value
    startInvestBox.investAmount = investAmountPLN / euroPrice
    startInvestBox.investAmount = Math.round(startInvestBox.investAmount * 100) / 100
}

const calcEndInvestDay = () => {
    const endTime = document.querySelector('.result-end-time')
    const date = new Date()
    const now = date.getTime()
    const endInvestMinsec = now + totalTime * 24 * 60 * 60 * 1000
    const endInvestDay = new Date(endInvestMinsec)
    endTime.innerText = `Dzień wypłaty środków: ${endInvestDay.getDate()}.${endInvestDay.getMonth() + 1}.${endInvestDay.getFullYear()}r.`
}

const calcDailyIncome = () => {
    calcInvestEUR()
    if (!inputSix.checked && !inputTwelve.checked) alert('Wybierz plan inwestycyjny.')
    if (inputSix.checked == true) {
        multiplier = 1.3;
        boxTime = 182
    } else if (inputTwelve.checked == true) {
        multiplier = 1.7;
        boxTime = 365
    }
}

const calcTotalTime = () => {
    if (!reinvestTime || parseInt(reinvestTime) + timeToEnd < boxTime && !reInvestBoxArray[reInvestBoxArray.length - 1]) totalTime = boxTime
    else if (parseInt(reinvestTime) + timeToEnd < boxTime && reInvestBoxArray[reInvestBoxArray.length - 1]) totalTime = boxTime + reInvestBoxArray[reInvestBoxArray.length - 1].passedTime
    else totalTime = parseInt(reinvestTime) + timeToEnd
}

const showResult = () => {
    const showTime = document.querySelector('.result-total-time')
    const showIncome = document.querySelector('.result-total-income')
    const showRoi = document.querySelector('.result-roi')

    calcTotalTime()
    calcEndInvestDay()
    const totalIncome = Math.round(balance * euroPrice)
    const roi = Math.round((totalIncome / inputInvestAmount.value) * 100)

    showTime.innerText = `Ilośc dni od rozpoczęcią inwestycji: ${totalTime}.`
    showIncome.innerText = `Stan konta na ostatni dzień: ${totalIncome} PLN.`
    showRoi.innerText = `Twój zysk wyniesie ${roi}%`
}

const calcBalance = (e) => {
    e.preventDefault()
    calcDailyIncome()
    let dailyIncomeReinvestBox = []
    let time = 0
    const timeCalc = () => {
        if (!reinvestTime || reinvestTime < boxTime) time = boxTime
        else time = reinvestTime
    }
    timeCalc()
    for (let i = 0; i < time; i++) {
        if (!reInvestBoxArray[0]) dailyIncome = startInvestBox.investAmount * multiplier / boxTime
        else {
            for (let i = 0; i < reInvestBoxArray.length; i++) {
                dailyIncomeReinvestBox[i] = reInvestBoxArray[i].investAmount * multiplier / boxTime
            }
            let dailyIncomeReinvestSum = 0
            dailyIncomeReinvestBox.forEach(el => {
                dailyIncomeReinvestSum += el
            });

            dailyIncome = startInvestBox.investAmount * multiplier / boxTime + dailyIncomeReinvestSum
        }
        balance += dailyIncome
        if (balance >= 50 && weekDayIterator == 0 && inputYes.checked && i < reinvestTime) {
            reInvestBoxArray[reInvestBoxArray.length] = new _Invest__WEBPACK_IMPORTED_MODULE_0__["Invest"](balance, 0)
            balance = 0
            weekDayIterator = 7
        }
        startInvestBox.passedTime++
        if (weekDayIterator != 0) weekDayIterator--
        if (startInvestBox.passedTime >= boxTime) startInvestBox.investAmount = 0

        reInvestBoxArray.forEach(el => {
            el.passedTime++
        })
        reInvestBoxArray.forEach(el => {
            if (el.passedTime >= boxTime) el.investAmount = 0
        })
    }
    startInvestBox = null
    console.log(dailyIncomeReinvestBox)
    console.log(reInvestBoxArray, startInvestBox, balance, multiplier, boxTime, reinvestTime)
    if (inputYes.checked && reInvestBoxArray[reInvestBoxArray.length - 1]) timeToEnd = boxTime - reInvestBoxArray[reInvestBoxArray.length - 1].passedTime
    for (let i = 0; i < timeToEnd; i++) {
        let dailyIncomeReinvestSum = 0
        dailyIncomeReinvestBox.forEach(el => {
            dailyIncomeReinvestSum += el
        });
        balance += dailyIncomeReinvestSum
        reInvestBoxArray.forEach(el => {
            el.passedTime++
        })
        for (let i = 0; i < reInvestBoxArray.length; i++) {
            const el = reInvestBoxArray[i]
            if (el.passedTime >= boxTime) {
                el.investAmount = 0
                dailyIncomeReinvestBox[i] = 0
            }
        }
    }
    showResult()
}

function reinvestDisabled() {
    if (this.checked) {
        inputInvestTime.setAttribute('disabled', 'disabled')
        inputInvestTime.value = ''
        investTimeSection.style.display = 'none'
    }
}

function reinvestDisabledOut() {
    if (this.checked) {
        inputInvestTime.removeAttribute('disabled')
        investTimeSection.style.display = 'block'
    }
}

startButton.addEventListener('click', calcBalance)
inputNo.addEventListener('change', reinvestDisabled)
inputYes.addEventListener('change', reinvestDisabledOut)
_password__WEBPACK_IMPORTED_MODULE_1__["passwordButton"].addEventListener('click', _password__WEBPACK_IMPORTED_MODULE_1__["checkPassword"])
document.addEventListener("DOMContentLoaded", function () {
    const password = JSON.parse(localStorage.getItem('passwordValue'));
    if (password.value) {
        if (password.value == "Ekipa1") _password__WEBPACK_IMPORTED_MODULE_1__["passwordSection"].style.display = 'none'
    }
});

document.querySelector('.changes-form--button-reset').addEventListener('click', function () {
    location.reload()
})

/***/ }),

/***/ "./src/password.js":
/*!*************************!*\
  !*** ./src/password.js ***!
  \*************************/
/*! exports provided: passwordSection, passwordButton, checkPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordSection", function() { return passwordSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordButton", function() { return passwordButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPassword", function() { return checkPassword; });
const passwordSection = document.querySelector('.password')
const passwordInput = document.querySelector('.password-input')
const passwordButton = document.querySelector('.password-button')
const passwordInfo = document.querySelector('.password-info')

const checkPassword = (e) => {
    e.preventDefault()
    const password = {
        value: passwordInput.value
    }

    if (password.value == 'Ekipa1') {
        passwordSection.style.display = 'none'
        localStorage.setItem('passwordValue', JSON.stringify(password))
    } else {
        passwordInfo.innerText = 'Błędne hasło. Spróbuj ponownie.'
        passwordInput.value = ''
    }
}

/***/ })

/******/ });
//# sourceMappingURL=index.js.map