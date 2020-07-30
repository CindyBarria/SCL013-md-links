const mdLinks = require('./index');

const files = process.argv[2];
console.log('opcion2', files)
const chalk = require('chalk');
mdLinks.readingFile(files);
const path = require('path');
const readingFile = require('./index');
//let file = process.argv[2]; // Toma el archivo que se le da en la consola

//const mdlinks = require('./index'); // Mi función de index.js
const option1 = process.argv[3];
console.log('opcion3', option1)
const option2 = process.argv[4];
console.log('opcion4', option2)
let options = {
    validate: false,
    stats: false
}

// Chequea la  opciones introducidas por el usuario y cambia los flags
const checkOptions = () => {
    if (option1 === '-v' && option2 === '-s' || option1 === '-s' && option2 === '-v') {
        options = {
            validate: true,
            stats: true
        }
    } else if (option1 === '-v' || option1 === '--validate') {
        options = {
            validate: true,
            stats: false
        }
    } else if (option1 === '-s' || option1 === '--stats') {
        options = {
            validate: false,
            stats: true
        }
    }
}
checkOptions();
