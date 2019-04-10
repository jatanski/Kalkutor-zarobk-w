import {
   Invest
} from './Invest'

import {
   passwordButton,
   passwordSection,
   checkPassword
} from './password'

const inputInvestAmount = document.querySelector('.changes-form__input-invest-amount')
const inputInvestTime = document.querySelector('.changes-form__input-invest-time')
const inputEuroPrice = document.querySelector('.changes-form__input-euro-price')
const inputSix = document.getElementById('six')
const inputTwelve = document.getElementById('twelve')
const startButton = document.querySelector('.changes-form--button-submit')
const inputYes = document.getElementById('yes')
const inputNo = document.getElementById('no')
const investTimeSection = document.querySelector('.invest-time')

let startInvestBox = new Invest()
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
         reInvestBoxArray[reInvestBoxArray.length] = new Invest(balance, 0)
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
passwordButton.addEventListener('click', checkPassword)
document.addEventListener("DOMContentLoaded", function () {
   const password = JSON.parse(localStorage.getItem('passwordValue'))
   if (password.value == "Dupa1") passwordSection.style.display = 'none'
});

document.querySelector('.changes-form--button-reset').addEventListener('click', function () {
   location.reload()
})