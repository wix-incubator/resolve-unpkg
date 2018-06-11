import {createPathIfDoesntExist} from './utils';
import * as fs from 'fs';
import * as path from 'path';
import {resolveUnpkg} from './resolveUnpkg';

export function resolveUnpkgFromFS({files = ['index.html'], dist = '', unpkgPrefix, versionPlaceholder, onlyByVersionPlaceholder = true}: {files?: string[], dist?: string, unpkgPrefix?: string, versionPlaceholder?: string, onlyByVersionPlaceholder?: boolean}) {
  files.forEach(file => {
      let source: string = fs.readFileSync(file, 'utf-8');

      const processedContent: string = resolveUnpkg(source, {
          unpkgPrefix,
          versionPlaceholder,
          onlyByVersionPlaceholder
      });

      const distFile = path.join(dist, file);

      createPathIfDoesntExist(distFile);

      fs.writeFileSync(distFile, processedContent);
  });
}
