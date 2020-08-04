const mdLinks = require('./index');

const files = process.argv[2];
const [, , ...arg] = process.argv;

mdLinks(files, arg);
