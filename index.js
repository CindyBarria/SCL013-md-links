/*module.exports = () => {
  // ...
};*/

const fs = require('fs');

fs.readdir('./', (error, files) => {
  if (error) {
    console.log(error)
  }
  console.log(files)
});


fs.readFile('PRUEBA.md', 'UTF-8', (err, data) => {
  if (err) {
    console.log(err)
  }
  console.log(data)
});

