/* eslint-disable max-len */
const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const chalk = require('chalk');
const nodeFetch = require('node-fetch');

// Función para limitar texto a 50 caracteres
const limitText = (text) => {
  if (text.length > 50) {
    const textFile = text.slice(0, 50);
    return textFile;
  } return text;
};

// Función para validar el estatus de la url
const validateUrl = (links) => {
  // eslint-disable-next-line array-callback-return
  links.map((link) => {
    nodeFetch(link.href)
      .then((resp) => {
        if (resp.statusText === 'OK') {
          // eslint-disable-next-line no-console
          console.log(chalk.greenBright('Link WORKING', chalk.magenta('status:'), `${resp.statusText}`, `${resp.status}`, chalk.magenta('href:'), `${link.href}`, chalk.magenta('text:'), `${link.text}`, chalk.magenta('file:'), `${link.file}`));
        } else if (resp.status === 404) {
          // eslint-disable-next-line no-console
          console.log(chalk.redBright('Link BROKEN', chalk.magenta('status:'), 'FAIL', `${resp.status}`, chalk.magenta('href:'), `${link.href}`, chalk.magenta('text:'), `${link.text}`, chalk.magenta('file:'), `${link.file}`));
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(chalk.yellow('Link con errores', chalk.magenta('href:'), `${link.href}`, chalk.magenta('error:'), `${error}`));
      });
  });
};

// Función que calcula total de links y links unicos

const printTotalLinks = (links) => {
  const numOfLinks = [];
  links.forEach((link) => {
    numOfLinks.push(link.href);
  });
  const uniqueLinks = new Set(numOfLinks);
  // eslint-disable-next-line no-console
  console.log(
    chalk.black.bgGreen('Total: '),
    chalk.green(numOfLinks.length),
    chalk.black.bgYellow('Unique: '),
    chalk.yellow(uniqueLinks.size),
  );
};

// Función que calcula total de links rotos
const printTotalBroken = (links) => {
  const linksHref = links.map((link) => link.href);
  let brokenLinks;
  let countBroken = 0;
  linksHref.forEach((elem) => {
    brokenLinks = nodeFetch(elem)
      .then((resp) => {
        if (resp.status !== 200) {
          countBroken += 1;
        }
        return countBroken;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  });
  brokenLinks.then((res) => {
    // eslint-disable-next-line no-console
    console.log(chalk.black.bgRed('Broken: '), chalk.redBright(res));
  });
};

// Función para verificar el archivo .md y extraer los anchors devolviendo un array de objetos
const verifyMdFile = (dom, path, options) => {
  const links = dom.window.document.querySelectorAll('a');
  const linksArray = Array.from(links);

  const filteredLinks = linksArray.filter((a) => a.href.includes('http'));

  // eslint-disable-next-line arrow-body-style
  const objects = filteredLinks.map((a) => {
    return {
      text: limitText(a.innerHTML),
      href: a.href,
      file: path,
    };
  });

  if (options.validate === true && options.stats === true) {
    validateUrl(objects);
    printTotalLinks(objects);
    printTotalBroken(objects);
  } else if (options.validate === true) {
    validateUrl(objects);
  } else if (options.stats === true) {
    printTotalLinks(objects);
    printTotalBroken(objects);
  } else {
    objects.forEach((link) => {
      // eslint-disable-next-line no-console
      console.log(chalk.blueBright('=>'), chalk.magentaBright(link.href), chalk.cyanBright.bold(link.text), chalk.bgBlue.bold(link.file));
    });
  }
};

// Función que lee el archivo .md
// eslint-disable-next-line arrow-body-style
const readingFile = (path, options = { validate: false, stats: false }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
    .then((data) => {
      // eslint-disable-next-line no-console
      console.log(chalk.bgMagenta('Lectura de Archivo: ', path));
      const html = md.render(data.toString());
      const dom = new JSDOM(html);
      verifyMdFile(dom, path, options);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

module.exports = {
  limitText, validateUrl, readingFile, verifyMdFile,
};
