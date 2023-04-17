// DECLARATION 

const boxPercent = document.querySelectorAll('.content__calculate__tip')
const button = document.querySelector('.result__total__button')
const bill = document.getElementById('bill')
const custom = document.getElementById('custom')
const numberPerson = document.getElementById('people')
const totalTip = document.getElementById('tipAmount')
const totalPerson = document.getElementById('total')
const error = document.querySelector('.message__error')

// INITIALIZE

bill.value = 0
custom.value = 0
numberPerson.value = 0

// SELECT BOX ACTIVE PERCENT

boxPercent.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        selectPercent(index)
    }) 
})

let currentActive = 0

function selectPercent(index) {
    boxPercent[index].classList.add('active')
    boxPercent[currentActive].classList.remove('active')
    currentActive = index
}

// GET VALUE INPUT CUSTOM OR SELECT TIP

numberPerson.addEventListener('input', ()=>{
    errorMessage()
    if(custom.value > 0){
        calculate(parseInt(custom.value))
    } else {
        let select = boxPercent[currentActive].getAttribute('data-value')
        calculate(select)
    }
})

// MESSAGE ERROR

function errorMessage() {
    if(numberPerson.value <= 0) {
        error.classList.add('message__error--active')
        numberPerson.style.border= "2px solid red"
    } else {
        error.classList.remove('message__error--active')
        numberPerson.style.border= "none"
    }
}

// CALCULATE TOTALS

function calculate(percent) {

    if(bill.value > 0 && percent > 0 && numberPerson.value > 0){

        let totalTipAmount = (bill.value / numberPerson.value) * (percent / 100)
        let totalBillPerson = (bill.value / numberPerson.value) + totalTipAmount

        totalTip.innerText = `$${totalTipAmount.toFixed(2)}`
        totalPerson.innerText = `$${totalBillPerson.toFixed(2)}`

    } else {
        totalTip.innerText = `$0.00`
        totalPerson.innerText = `$0.00`
    }   
    
}

// RESET BUTTON AND DISABLED BUTTON

button.addEventListener('click', () => resetButton())

function resetButton() {
    bill.value = 0
    boxPercent[currentActive].classList.remove('active')
    custom.value = 0
    numberPerson.value = 0
    totalTip.innerText = "$0.00"
    totalPerson.innerText = "$0.00"
    button.disabled = true
}

function disabledButton() {
    if(bill.value >= 0 || custom.value >= 0 || numberPerson.value >= 0){
        button.disabled = false
    } else {
        button.disabled = true
    }
        
}






