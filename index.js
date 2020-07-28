/* IMPORTO MIS LIBRERIAS */
const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const chalk = require('chalk');

const readingFile = (path) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(chalk.bgMagenta('Lectura de Archivo'));
    const html = md.render(data.toString());
    const dom = new JSDOM(html);
    verifyMdFile(dom, path);
  })
}
const verifyMdFile = (dom, path) => {
  const links  = dom.window.document.querySelectorAll('a');
  const linksArray = Array.from(links);

  const filteredLinks = linksArray.filter(a => a.href.includes('http'));

  const linkObjects = filteredLinks.map(a => {
    return {
      text: a.innerHTML,
      href: a.href,
      file: path
    }
  })
  console.log(linkObjects);
}

module.exports = {
  readingFile: readingFile
}