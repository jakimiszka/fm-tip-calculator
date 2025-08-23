const bill_input =  document.querySelector('.grid__tip--bill');
const people_input =  document.querySelector('.grid__tip--people');
const reset_button = document.querySelector('#reset');
const buttons = document.querySelectorAll('.grid__tip__buttons button');
const invalid_msg_bill = document.querySelector('.invalid_msg_bill');
const invalid_msg_people = document.querySelector('.invalid_msg_people');
const custom_input = document.querySelector('.custom_input');
const custom_button = document.querySelector('.grid__tip__buttons--custom');

const validations = {
  bill: (value) => isValidDecimal(value),
  people: (value) => isValidInteger(value)
}

function isValidDecimal(value) {
    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    const trimmed = value.trim();
    return trimmed !== '' && decimalRegex.test(trimmed) && Number(trimmed) > 0;
}
function isValidInteger(value) {
    const integerRegex = /^(0|[1-9]\d*)$/;
    const trimmed = value.trim();
    return trimmed !== '' && integerRegex.test(trimmed) && Number(trimmed) > 0;
}

function dataIsValid (element, key, value){
    const isValid = validations[key](value);
    if (!isValid) {
        element.classList.add("invalid_input");
        key === 'bill' ? invalid_msg_bill.style.display = 'block' : invalid_msg_people.style.display = 'block';
    } else {
        element.classList.remove("invalid_input");
        key === 'bill' ? invalid_msg_bill.style.display = 'none' : invalid_msg_people.style.display = 'none';
    }
    return isValid;
}

function checkInteger(input){
     input.addEventListener('input', function(e) {
        let element = e.target;
        const name = element.name;
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        e.target.value = value;

        dataIsValid(element, name, value);
     })
}

function restrictToTwoDecimals(input) {
    input.addEventListener('input', function(e) {
        let element = e.target;
        let value = e.target.value;
        const name = e.target.name;
            value = value.replace(/[^0-9.]/g, '');
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
                console.log(value)
            }
            if (parts[1] && parts[1].length > 2) {
                value = parts[0] + '.' + parts[1].substring(0, 2);
                console.log(value)
            }
            if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
                value = value.substring(1);
            }
            e.target.value = value;

        dataIsValid(element, name, value);
    });
}

custom_input.addEventListener('blur', (e) => {
    custom_input.style.display = 'none';
    custom_button.style.display = 'block';
})

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const billValue = Number(bill_input.value);
        const people = Number(people_input.value);
        const tip = Number(button.dataset.name);
        const bill_isValid = dataIsValid(bill_input, 'bill', bill_input.value);
        const people_isValid  = dataIsValid(people_input, 'people', people_input.value);
        if(tip === 100){
            custom_button.style.display = 'none';
            custom_input.style.display = 'block';
            custom_input.focus();
        }
        if(bill_isValid && people_isValid){
            const tipAmount = (billValue * tip) / 100;
            const total = (billValue + tipAmount) / people;
            console.log(tipAmount, total);
        }
    })
})

const resetForm = (e) => {
    console.log('form reset');
}

reset_button.addEventListener('click', resetForm);
restrictToTwoDecimals(bill_input);
checkInteger(people_input);