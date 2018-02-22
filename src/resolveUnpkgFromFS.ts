import {createPathIfDoesntExist} from './utils';
import * as fs from 'fs';
import {resolveUnpkg} from './resolveUnpkg';

export function resolveUnpkgFromFS({file = 'index.html', dist = '', unpkgPrefix = 'unpkg.com', versionPlaceholder = 'x.x.x', onlyByVersionPlaceholder = false}) {
  dist = dist || file;

  createPathIfDoesntExist(dist);

  let source: string = fs.readFileSync(file, 'utf-8');

  const processedContent: string = resolveUnpkg(source, {unpkgPrefix, versionPlaceholder, onlyByVersionPlaceholder});
  fs.writeFileSync(dist, processedContent);
}
