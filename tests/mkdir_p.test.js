describe('# Testing \"makeDirectoryWithPath\" functionality', () => {
  afterEach(() => {
    jest.dontMock('fs')
  });

  test('should be able to create directories in the given path', () => {
    jest.doMock('fs');
    const fs = require('fs');
    const filepath = `${__dirname}/c/h/e.js`
    const { mkdir_p } = require('../');

    mkdir_p(filepath);
    expect(fs.__getDirPath()).toEqual(`${__dirname}/c/h/e.js`);
  });

  test('should throw error if there\'s no file in the filepath', () => {
    const filepath = `${__dirname}/c/h/`;
    const { mkdir_p } = require('../');

    try {
      mkdir_p(filepath);
    } catch(e) {
      expect(e.message).toEqual('No File in the path !');
    }
  });
});
