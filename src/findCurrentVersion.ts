import * as fs from 'fs';

export function findCurrentVersion(packageName) {
  let version;

  try {
    const path = require.resolve(packageName + '/package.json');
    const packageContent = fs.readFileSync(path, 'utf-8');
    version = JSON.parse(packageContent).version;
  } catch (e) {
    //
  }

  return version;
}
