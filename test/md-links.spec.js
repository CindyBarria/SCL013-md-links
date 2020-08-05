const mdLinks = require('../index.js');
// const path = require('path');
// eslint-disable-next-line no-undef
describe('mdLinks', () => {
  // eslint-disable-next-line no-undef
  it('should be an object...', () => {
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-undef
    expect(typeof mdLinks).toBe('object');
    // console.log('FIX ME!');
  });
});
// eslint-disable-next-line no-undef
describe('mdLinks.verify', () => {
  // eslint-disable-next-line no-undef
  it('should be a function', () => {
    // eslint-disable-next-line no-undef
    expect(typeof mdLinks.verifyMdFile).toBe('function');
  });
});
// eslint-disable-next-line no-undef
describe('mdLinks.limittext', () => {
  // eslint-disable-next-line no-undef
  it('should be a function', () => {
    // eslint-disable-next-line no-undef
    expect(typeof mdLinks.limitText).toBe('function');
  });
  // eslint-disable-next-line no-undef
  it('should return text limit to 50 caracters', () => {
    // eslint-disable-next-line no-undef
    expect(mdLinks.limitText('motor de JavaScript V8 de Chrome usado para  probar si nos funcionan los text')).toBe('motor de JavaScript V8 de Chrome usado para  proba');
  });
  // eslint-disable-next-line no-undef
  it('should return Node.js to Node.js', () => {
    // eslint-disable-next-line no-undef
    expect(mdLinks.limitText('Node.js')).toBe('Node.js');
  });
});
// eslint-disable-next-line no-undef
describe('mdLinks.validateUrl', () => {
  // eslint-disable-next-line no-undef
  it('should be a function', () => {
    // eslint-disable-next-line no-undef
    expect(typeof mdLinks.validateUrl).toBe('function');
  });
  const links = [
    {
      text: 'Markdown',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      file: 'prueba.md',
    },
  ];
  // eslint-disable-next-line no-undef
  it('should return an object', () => {
    return mdLinks.validateUrl(links).then((data) => {
      // eslint-disable-next-line no-undef
      expect(typeof (data)).toBe('Object');
    });
  });
});