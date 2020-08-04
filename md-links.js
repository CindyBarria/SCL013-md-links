const mdLinks = require('./index');

const files = process.argv[2];
const [,, ...arguments] = process.argv;

mdLinks.mdLinksModule(files, arguments);
