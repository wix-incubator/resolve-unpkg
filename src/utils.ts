import * as path from 'path';
import * as fs from 'fs';

export function createPathIfDoesntExist(filepath) {
  const dirname = path.dirname(filepath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  createPathIfDoesntExist(dirname);
  fs.mkdirSync(dirname);
}

export function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
