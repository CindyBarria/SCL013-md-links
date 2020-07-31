/* IMPORTO MIS LIBRERIAS */
const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const {
  JSDOM
} = jsdom;
const chalk = require('chalk');
const nodeFetch = require('node-fetch');

//Función que lee el archivo .md
const readingFile = (path) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(chalk.bgMagenta('Lectura de Archivo: ', path));
    const html = md.render(data.toString());
    const dom = new JSDOM(html); //----
    verifyMdFile(dom, path);
  })
}

//Función para verificar el archivo .md y extraer los anchors devolviendo un array de objetos
const verifyMdFile = (dom, path) => {
  const links = dom.window.document.querySelectorAll('a');
  const linksArray = Array.from(links);

  const filteredAnchors = linksArray.filter(a => a.href.includes('http'));

  const linkObjects = filteredAnchors.map(a => {
    return {
      text: a.innerHTML,
      href: a.href,
      file: path
    }
  })
  //console.log(linkObjects);
  validateUrl(linkObjects);
  printTotalLinks(linkObjects);
  printTotalBroken(linkObjects)

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
  //console.log('este es linkhref',linksHref)
  let brokenLinks;
  let countBroken = 0;
  linksHref.forEach(elem => {
    brokenLinks = nodeFetch(elem)
      .then(resp => {
        if (resp.status !== 200) {
          countBroken++
        }
        return countBroken;
        //console.log(countWorking, 'este es countworking')
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
  readingFile: readingFile
}
