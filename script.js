// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function for getting a random element from an array
function getRandomUpper() {
  var randomIndex = Math.floor(Math.random() * upperCasedCharacters.length);
  return upperCasedCharacters[randomIndex];  
}

function getRandomLower() {
  var randomIndex = Math.floor(Math.random() * lowerCasedCharacters.length);
  return lowerCasedCharacters[randomIndex]; 
}

function getRandomNumeric() {
  var randomIndex = Math.floor(Math.random() * numericCharacters.length);
  return numericCharacters[randomIndex];
}

function getRandomSymbol() {
  var randomIndex = Math.floor(Math.random() * specialCharacters.length);
  return specialCharacters[randomIndex];
}

// Get references to the element
const resultEl = document.getElementById('password')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numericEl = document.getElementById('numeric')
const symbolsEl = document.getElementById('symbols')
const generateBtn = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    numeric: getRandomNumeric,
    symbol: getRandomSymbol
}

// Add event listener to generate button
generateBtn.addEventListener('click', () => {
  const length = +lengthEl.value  
  const hasUpper = uppercaseEl.checked
  const hasLower = lowercaseEl.checked
  const hasNum = numericEl.checked
  const hasSymbol = symbolsEl.checked

  resultEl.innerText = generatePassword(hasUpper, hasLower, hasNum, hasSymbol, length)  
})

// Function to generate password
function generatePassword(upper, lower, numeric, symbol, length) {
  let generatedPassword = ''
  const typesCount = upper + lower + numeric + symbol
  const typesArr = [{upper}, {lower}, {numeric}, {symbol}].filter(item => Object.values(item)[0])

  if(typesCount === 0) {
      alert ('At least one character type should be selected')
  }

  for(let i=0; i < length; i += typesCount) {
      typesArr.forEach( type => {
          const funcName = Object.keys(type)[0]
          generatedPassword += randomFunc[funcName]()            
      })
  }
  
  const finalPassword = generatedPassword.slice(0, length)
  return finalPassword
}

// Function to copy password to clipboard
function copyToClipboard() {
  const password = resultEl.value.trim();

  if (!password) {
    alert('Generate a password first before copying.');
    return;
  }

  navigator.clipboard.writeText(password)
    .then(() => {
      alert('Password copied to clipboard');
    })
    .catch(err => {
      console.error('Unable to copy to clipboard', err);
      alert('Failed to copy password to clipboard. Please try again.');
    });
}

clipboardEl.addEventListener('click', copyToClipboard);

// Range Sliders
document.addEventListener('DOMContentLoaded', function () {
  const lengthInput = document.getElementById('length');
  const lengthValueSpan = document.getElementById('lengthValue');  

  lengthInput.addEventListener('input', function () {
    lengthValueSpan.textContent = lengthInput.value;
  });  
});
