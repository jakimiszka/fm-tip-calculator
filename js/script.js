const inputs = document.querySelectorAll('input');
const bill_input =  document.querySelector('.grid__tip--bill');
const people_input =  document.querySelector('.grid__tip--people');
const reset = document.querySelector('#reset');

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
    const integerRegex = /^\d+$/;
    const trimmed = value.trim();
    return trimmed !== '' && integerRegex.test(trimmed) && Number(trimmed) > 0;
}

function dataIsValid (key, value){
    return validations[key](value);
}

function checkInteger(input){
     input.addEventListener('input', function(e) {
        let element = e.target;
        const name = element.name;
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        e.target.value = value;

        const isValid = dataIsValid(name, value);
        if (!isValid) {
            element.classList.add("invalid_input");
            console.log(name + ': wrong data', isValid)
            console.log(element)
        } else {
            element.classList.remove("ivalid_input");
            console.log(name + ': valid data', isValid)
            console.log(element)
        }
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

        const isValid = dataIsValid(name, value);
        if (!isValid) {
            element.classList.add("invalid_input");
            console.log(name + ': wrong data', isValid)
            console.log(element)
        } else {
            element.classList.remove("ivalid_input");
            console.log(name + ': valid data', isValid)
            console.log(element)
        }
    });
}

restrictToTwoDecimals(bill_input);
checkInteger(people_input);


const resetForm = (e) => {
    console.log('form reset');
}

reset.addEventListener('click', resetForm);