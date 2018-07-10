describe('# Testing \"listAllFileAbsolutePaths\" functionlity', () => {
  beforeEach(() => {
    jest.dontMock('../')
  });

  test('should list all the files with their absolute paths in the directory', () => {
    const { lsfile_abs } = require('../');
    const filepath = `${__dirname}/testHelpers/dummyFolder`;
    const res = lsfile_abs(filepath, { exclude: [] })

    expect(res).toEqual([
      `${__dirname}/testHelpers/dummyFolder/a/b/test.txt`,
      `${__dirname}/testHelpers/dummyFolder/c/test2.txt`
    ]);

  })
})
