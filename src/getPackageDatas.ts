import {escapeRegExp} from './utils';

export interface IPackageData {
  fullMatch: string;
  packageName: string;
  version?: string;
  currentVersion?: string;
}

export function getPackageDatas({source, unpkgPrefix, versionPlaceholder, onlyByVersionPlaceholder}: { source: string, unpkgPrefix: string, versionPlaceholder?: string, onlyByVersionPlaceholder?: boolean }): IPackageData[] {
  const versionRegex = getVersionRegex(onlyByVersionPlaceholder, versionPlaceholder);
  const unpkgPrefixRegex = escapeRegExp(unpkgPrefix);

  const regex = new RegExp(`${unpkgPrefixRegex}\\/(\\S*)@(${versionRegex})`, 'g');

  const matches = getAllMatches(regex, source);

  return matches.map((match) => ({
    fullMatch: match[0],
    packageName: match[1],
    version: match[2]
  }));
}

function getVersionRegex(onlyByVersionPlaceholder: boolean, versionPlaceholder: string) {
  const versionRegexes = [];

  if (!onlyByVersionPlaceholder) {
    // versions can come in many form - just grab anything until "/" or end of line
    versionRegexes.push(`[^\\/\\s]+`);
  }

  if (versionPlaceholder) {
    versionRegexes.push(escapeRegExp(versionPlaceholder));
  }

  return versionRegexes.join('|');
}

function getAllMatches(regex: RegExp, fileContent: string) {
  let matcher = regex.exec(fileContent);
  const matches = [];

  while (matcher !== null) {
    matches.push(matcher);

    matcher = regex.exec(fileContent);
  }
  return matches;
}
