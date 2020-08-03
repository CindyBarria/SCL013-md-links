/* IMPORTO MIS LIBRERIAS */
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
  } else {
    return text;
  }
}
//Función que lee el archivo .md
const readingFile  = (path, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
       if (err) {
         reject(err);
       } else {
         resolve(data)
       }
    })
  })
  .then(data => {
    const html = md.render(data.toString());
    const dom = new JSDOM(html);
    verifyMdFile(dom, path, options);
  })
 .catch(err => console.log(err))
}

//Función para verificar el archivo .md y extraer los anchors devolviendo un array de objetos
const verifyMdFile = (dom, path) => {
  const links = dom.window.document.querySelectorAll('a');
  const linksArray = Array.from(links);

  const filteredAnchors = linksArray.filter(a => a.href.includes('http'));

  const objects = filteredAnchors.map(a => {
    return {
      text: limitText(a.innerHTML),
      href: a.href,
      file: path
    }
  })

  validateUrl(objects);
  printTotalLinks(objects);
  printTotalBroken(objects)

}
//Función que calcula total de links y links unicos
const printTotalLinks = (links) => {
  let numOfLinks = [];
  links.forEach(link => {
    numOfLinks.push(link.href);
  });
  let uniqueLinks = new Set(numOfLinks);
  console.log(
    chalk.black.bgGreen("Total: "),
    chalk.green(numOfLinks.length),
    chalk.black.bgYellow("Unique: "),
    chalk.yellow(uniqueLinks.size)
  );
}
//Función que calcula total de links rotos
const printTotalBroken = (links) => {
  const linksHref = links.map((link) => link.href);
  let brokenLinks;
  let countBroken = 0;
  linksHref.forEach(elem => {
    brokenLinks = nodeFetch(elem)
      .then(resp => {
        if (resp.status !== 200) {
          countBroken++
        }
        return countBroken;
      })
      .catch(error => {
        console.log(error)
      });
  })
  brokenLinks.then((res) => {
    console.log(chalk.black.bgRed("Broken: "), chalk.redBright(res))
  });
}

//Función para validar el estatus de la url
const validateUrl = (links) => {
  links.map(link => {
    nodeFetch(link.href)
      .then(resp => {
        if (resp.status === 200) {
          console.log(chalk.greenBright('Link WORKING', chalk.magenta('status:'), `${resp.status}`, chalk.magenta('href:'), `${link.href}`, chalk.magenta('text:'), `${link.text}`, chalk.magenta('file:'), `${link.file}`))
        } else if (resp.status === 404) {
          console.log(chalk.redBright('Link BROKEN', chalk.magenta('status:'), `${resp.status}`, chalk.magenta('href:'), `${link.href}`, chalk.magenta('text:'), `${link.text}`, chalk.magenta('file:'), `${link.file}`))
        }
      })
      .catch(error => {
        console.log(chalk.yellow('Link con errores', chalk.magenta('href:'), `${link.href}`, chalk.magenta('error:'), `${error}`))
      })
  })
};

module.exports = {
  readingFile: readingFile,
}