const fs = require('fs');
const dirTree = require('directory-tree');
const _ = require('lodash');

/**
 * A UNIX like implementation of mkdir-p functionality that Recursively creates
 * directory and files structure in a stringed File path. Since this feature
 * is not currently supported by Javascript's FileSystem module.
 * @param  {String} filepath    [description]
 * @param  {Number} mode   [description]
 * @param  {Number} position=1  [description]
 */
const makeDirectoryWithPath = (filepath, position=0) => {
  const path = require('path');
  const parts = path.normalize(filepath).split('/');

  //Base Case
  if(position >= parts.length - 1) {
    return;
  }

  const directory = parts.slice(0, position+2).join('/');

  try{
    if(__isAFile(filepath))
      fs.writeFileSync(filepath)
    else
      throw new Error('No File in the path !')
    makeDirectoryWithPath(filepath, position+1 );
  }
  catch(error) {
    if(__dirNotExist(error)){
      try { fs.mkdirSync(directory) }
      catch (e) {
        if(__dirAlreadyExists(e)){
          makeDirectoryWithPath(filepath, position+1)
        } else {
          throw e;
        }
      }
      makeDirectoryWithPath(filepath, position+1);
    } else {
      throw error;
    }
  }
}

/**
 * Replaces all file content within the tag with what has been passed in the replacer object.
 * Helpful in creating templates of some sort.
 * @param  {String} filepath path of the template file
 * @param  {String} replaceTag custom tags to differentiate the replaceables
 * @param  {Object} replacer object consisting of values to be replaced
 * @param  {String} copyTo(optional) path where the replaced file should be copied
 */
const searchAndReplace = ({ filepath, replaceTag='%', replacer, copyTo=undefined }) => {
  let re;
  try {
    let fileData = fs.readFileSync(filepath, 'utf8');
    Object.keys(replacer).forEach((key) => {
      reReplace = new RegExp(`${replaceTag}${key}${replaceTag}`,'g');
      reUnstring = new RegExp(`("#|#")`,'g');

      fileData = fileData
        .replace(reReplace, replacer[key])
        .replace(reUnstring, '')

      if(copyTo) {
        let to = copyTo+filepath.slice(13,filepath.length);
        if (!fs.existsSync(to)){
          makeDirectoryWithPath({ filepath: to });
        }
        fs.writeFileSync(to, fileData, 'utf8')
      }
      else {
        fs.writeFileSync(filepath, fileData, 'utf8')
      }
    });
  } catch(e) {
    throw e;
  }
}

/**
 * List absolute paths of all the files in a Directory.
 * @param  {String} directory Directory to walk
 * @param  {Array} exclude List of paths that needs to be excluded
 * @return {Array} List of files with their absolute paths
 */
const listAllFileAbsolutePaths = (directory, { exclude=[] }) => {
  const tree = listDirectoryTree(directory, exclude);
  return __walkDirectory(tree);
}

const __walkDirectory = (tree) => {
  let walkedFilePaths = [];

  if(tree.type === 'file'){
    walkedFilePaths.push(tree.path);
    return;
  }

  tree.children.forEach((child) => {
    if(!walkedFilePaths.includes(child.path)){
      __walkDirectoryUtil(child, walkedFilePaths)
    }
  });

  return walkedFilePaths;
}

const __walkDirectoryUtil = (subTree, walkedFilePaths) => {
  if(subTree.type === 'file'){
    walkedFilePaths.push(subTree.path);
  }

  if(subTree.children){
    subTree.children.forEach((child) => {
      if(!walkedFilePaths.includes(child)){
        __walkDirectoryUtil(child, walkedFilePaths)
      }
    });
  } else return;
}

/**
 * Searches a File in a given Directory
 * @param  {[type]} filename  File to be searched
 * @param  {[type]} searchIn  Location to be searched in
 * @return {Boolean, String}  Returns path if found, else return false
 */
const searchFile = ({ filename, searchIn }) => {
  const tree = listDirectoryTree(searchIn);
  return __search(tree, filename, []);
}

/**
 * Searching Files within a Project Directory quickly,
 * using the Depth First Search Algorithm
 * @param  {Object} tree         Directory tree object
 * @param  {String} toSearch     file name with extension to be searched
 * @param  {Array} visitedPaths  memoize visited paths
 * @return {String, Boolean}     Return path if found, else returns false
 */
const __search = (tree, toSearch, visitedPaths) => {
  let found = [];

  if(tree.type != 'directory'){
    return false;
  }
  tree.children.forEach((child) => {
    if(!visitedPaths.includes(child)){
      __searchUtil(child, visitedPaths, toSearch, found)
    }
  });

  if(found.length > 0){
    return found[0].path;
  } else {
    return false;
  }
}

const __searchUtil = (subTree, visitedPaths, toSearch, found) => {
  visitedPaths.push(subTree);

  if(subTree.name === toSearch) {
    found.push(subTree);
  }
  if(subTree.children){
    subTree.children.forEach((child) => {
      if(!visitedPaths.includes(child) && found.length < 1){
        __searchUtil(child, visitedPaths, toSearch, found)
      }
    });
  } else return;
}

/**
 * Returns Directory tree. Courtesy: << npm directory-tree >>
 * @param  {String} searchIn Directory location to be searched in
 * @param  {Array} exclude  directories to be excluded
 * @return {Object}  returns Directory tree
 */
const listDirectoryTree = (searchIn, exclude) => {
  return dirTree(searchIn, { exclude });
}

const __dirNotExist = (error) => {
  return (error.code === 'ENOENT' && error.errno === -2);
}
const __dirAlreadyExists = (error) => {
  return (error.code === 'EEXIST' && error.errno === -17);
}
const __isAFile = (filepath) => {
  return (filepath.indexOf('.') != -1);
}



module.exports = {
  mkdir_p: makeDirectoryWithPath,
  search_f: searchFile,
  lsfile_abs: listAllFileAbsolutePaths,
  searchAndReplace: searchAndReplace
}
