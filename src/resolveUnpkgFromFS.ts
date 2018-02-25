import {createPathIfDoesntExist} from './utils';
import * as fs from 'fs';
import {resolveUnpkg} from './resolveUnpkg';

export function resolveUnpkgFromFS({file = 'index.html', dist = '', unpkgPrefix, versionPlaceholder, onlyByVersionPlaceholder}: {file?: string, dist?: string, unpkgPrefix?: string, versionPlaceholder?: string, onlyByVersionPlaceholder?: boolean}) {
  dist = dist || file;

  createPathIfDoesntExist(dist);

  let source: string = fs.readFileSync(file, 'utf-8');

  const processedContent: string = resolveUnpkg(source, {unpkgPrefix, versionPlaceholder, onlyByVersionPlaceholder});
  fs.writeFileSync(dist, processedContent);
}
