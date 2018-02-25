import {getPackageDatas, IPackageData} from './getPackageDatas';
import {findCurrentVersion} from './findCurrentVersion';

export function resolveUnpkg(source: string, {unpkgPrefix = 'unpkg.com', versionPlaceholder = 'x.x.x', onlyByVersionPlaceholder = false}): string {
  const matches: IPackageData[] = getPackageDatas({
    source,
    unpkgPrefix,
    versionPlaceholder,
    onlyByVersionPlaceholder
  });

  matches.forEach(match => {
    match.currentVersion = findCurrentVersion(match.packageName);
  });

  matches.forEach(match => {
    if (!match.currentVersion) {
      return;
    }

    source = source.replace(unpkgPrefix + '/' + match.packageName + '@' + match.version, unpkgPrefix + '/' + match.packageName + '@' + match.currentVersion);
  });

  return source;
}
