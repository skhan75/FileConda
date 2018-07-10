/**
* MIT License
*
* Copyright (c) 2018 [Sami Ahmad Khan]
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
* MIT License
*
* Copyright (c) 2018 Sami Ahmad Khan
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

const fs = jest.genMockFromModule('fs');


let dirs, file, fileData;
global.mockedMkdirFiles;

const __setDirPath = (filepath) => {
  dirs = filepath;
}

const mkdirSync = (filepath) => {
  __setDirPath(filepath);
}

const __getDirPath = () => {
  return dirs;
}

const __setFilePath = (filepath) => {
  file = filepath;
}

const __getFilePath = () => {
  return file;
}

const __getFileData = () => {
  return fileData;
}



const writeFileSync = (file, content) => {
  if(content){
    fileData = content;
  } else {
    const error = {
      code: 'ENOENT',
      errno: -2
    };
    throw error;
  }
}

const readFileSync = (data) => {
  return data;
}






fs.mkdirSync = mkdirSync;
fs.readFileSync = readFileSync;
fs.__getFileData = __getFileData;
fs.__setDirPath = __setDirPath;
fs.__getDirPath = __getDirPath;
fs.writeFileSync = writeFileSync;

module.exports = fs;
