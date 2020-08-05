const mdLinks = require('./index');

// Retorna un arr con los arg pasados a la terminal, 1 ejecutable node, 2 ruta del ejecutabl,3 args
const [, , ...args] = process.argv;

// Función principal que se exporta a md-links
const mdLinksModule = (files, arg) => {
  if ((arg.includes('--validate') && arg.includes('--stats')) || (arg.includes('--v') && arg.includes('--s'))) {
    mdLinks.readingFile(files, { validate: true, stats: true });
  } else if (arg.includes('--validate') || arg.includes('--v')) {
    mdLinks.readingFile(files, { validate: true, stats: false });
  } else if (arg.includes('--stats') || arg.includes('--s')) {
    mdLinks.readingFile(files, { validate: false, stats: true });
  } else {
    mdLinks.readingFile(files);
  }
};

mdLinksModule(process.argv[2], args);
