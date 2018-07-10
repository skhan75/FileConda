describe('# Testing \"searchFile\" functionality', () => {

  test('- should return file path for a file that exists', () => {
    const { search_f } = require('../');
    const res = search_f({ filename: 'test.txt', searchIn: `${__dirname}/testHelpers/dummyFolder`});
    expect(res).toEqual(`${__dirname}/testHelpers/dummyFolder/a/b/test.txt`);
  });

  test('- should return false for a file that doesn\'t exists', () => {
    const { search_f } = require('../');
    const res = search_f({ filename: 'wrongName.js', searchIn: `${__dirname}/testHelpers/dummyFolder`});
    expect(res).toEqual(false);
  });
})
