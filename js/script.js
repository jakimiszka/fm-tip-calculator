const inputs = document.querySelectorAll('input');
const reset = document.querySelector('#reset');

const validations = {
  bill: (value) => !isNaN(value) && value !== '' && value !== null, // decimal, > 0
  people: (value) => value.includes('@'),   // integers only, > 0
}

const dataIsValid = (key, value) => {
  return validations[key](value);
}

const handleChange = (e) => {
  const input = e.target;
  const isValid = dataIsValid(input.name, input.value);
  console.log(isValid)
}

inputs.forEach(input => {
  input.addEventListener('change', handleChange);
});

const resetForm = (e) => {
//   const data = {};
//   inputs.forEach(input => {
//     data[input.name] = input.value;
//   });
//   console.log(data)
}

reset.addEventListener('click', resetForm);