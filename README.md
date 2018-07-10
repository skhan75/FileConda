This Library is an extension on 'fs' module and is exported as Node.js modules

## Installation

Using npm:

```
$ npm i --save file-conda
```

In Node.js:

```
const fileConda = require('file-conda')
```

## Usage

### .mkdir_p
A Unix like implementation of mkdir-p functionality that recursively creates directory and files structure in a stringed File path.

#### Syntax
```
mkdir_p(<filepath>(String))
```

#### Example
Assume that you want to create a file `E.txt` in the filepath `/A/B/C` which does not exists either.

```
mkdir_p('/Users/john/Documents/A/B/C/E.txt')
```

This will create directories A/, B/ and C/ in the filepath in the specified order with file E.txt.

### .search_f
Searches a File in a given Directory

#### Syntax
```
search_f({ filename: <filename>(String), searchIn: <locationPath>(String)})
```

#### Example
```
search_f({ filename: 'test.txt', searchIn: '/Users/john/Documents/someDirectory'})
```

### .listf_abs
List absolute paths of all the files in a Directory

#### Syntax
```
listf_abs( <filepath>(String), { exclude: [list of paths to exclude] } )
```

#### Example
`exclude` is an optional field which takes in a list of paths that you want to exclude. `Default: exclude: []`
```
listf_abs( /Users/john/Desktop/HelloWorld/)
listf_abs( /Users/john/Desktop/HelloWorld/, { exclude: [/tests/, /node_modules/] }
```

### .searchAndReplace

#### Syntax
```
searchAndReplace({
  filepath: <filepath>(String),
  replaceTag: <tagSymbol>(String, default: '%'),
  replacer: { field: value, .. },
  copyTo: <destinationPath>(String, optional)
})
```

#### Example
Sample `index.js` template File Content:

```
@fileOverview
@author %authorName%

const %functionName% = () => {}
```

Running the code below on the above file
```
searchAndReplace({
  filepath: '/Users/john/Desktop/myProjectTemplate/index.js',
  replaceTag:'%',
  replacer: { authorName: 'John', functionName: 'handler' },
  copyTo: '/Users/john/Desktop/myProject/index.js'
})
```
will give an output in a new folder `myProject` as below
```
@fileOverview
@author John

const handler = () => {}
```
