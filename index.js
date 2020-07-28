/* IMPORTO MIS LIBRERIAS */
const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const chalk = require('chalk');
/* const fetch = require('fetch');
const fetchLink = fetch.fetchUrl; */
const nodeFetch = require('node-fetch');

const verifyMdFile = (dom, path) => {
  const links  = dom.window.document.querySelectorAll('a');
  const linksArray = Array.from(links);

  const filteredAnchors = linksArray.filter(a => a.href.includes('http'));

  const linkObjects = filteredAnchors.map(a => {
    return {
      text: a.innerHTML,
      href: a.href,
      file: path
    }
  })
  console.log(linkObjects);
  validateUrl(linkObjects);
}

const validateUrl = (links) => { 
  links.map(link => {
    nodeFetch(link.href)
    .then(resp => {
      if(resp.status === 200) {
        console.log(chalk.greenBright(`Link WORKING, status: ${resp.status} ${link.href}`))
      } else {
        console.log(chalk.redBright(`Link BROKEN, status: ${resp.status} ${link.href}`))
      }
    })
    .catch(error => {
      console.log(chalk.yellow(`Link con errores, ${link.href} ${error}`))
    })
  })
};


const readingFile = (path) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(chalk.bgMagenta('Archivo leído'));
    const html = md.render(data.toString());
    const dom = new JSDOM(html);  //----
    verifyMdFile(dom, path);
  })
}

module.exports = {
  readingFile: readingFile
}