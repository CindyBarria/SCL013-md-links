const mdLinks = require('./index');

// const files = process.argv[2];
// Retorna un arr con los arg pasados a la terminal, 1 ejecutable node, 2 ruta del ejecutabl,3 args
const [, , ...args] = process.argv;

// mdLinks.mdLinksModule(files, arg);

// Función principal que se exporta a md-links
const mdLinksModule = (files, arg) => {
  if ((arg.includes('--validate') && arg.includes('--stats')) || (arg.includes('--v') && arg.includes('--s'))) {
    mdLinks(files, { validate: true, stats: true });
  } else if (arg.includes('--validate') || arg.includes('--v')) {
    mdLinks(files, { validate: true, stats: false });
  } else if (arg.includes('--stats') || arg.includes('--s')) {
    mdLinks(files, { validate: false, stats: true });
  } else {
    mdLinks(files);
  }
};

mdLinksModule(process.argv[2], args);
