describe('# Testing \"searchAndReplace\" functionality', () => {
  afterEach(() => {
    jest.dontMock('fs')
  });

  test('should read file data and replace the values within % tags', async() => {
    jest.doMock('fs');
    const fs = require('fs');
    const { searchAndReplace } = require('../');
    const dummyFileData = `%greeting% from %name%`;
    const expectedTransformedData = `Hello from Sam`;

    searchAndReplace({
      filepath: dummyFileData,
      replaceTag:'%',
      replacer: { greeting: 'Hello',name: 'Sam' },
    });

    expect(await fs.__getFileData()).toEqual(expectedTransformedData);
  });
});
