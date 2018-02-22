import {expect} from 'chai';
import {getPackageDatas} from '../src/getPackageDatas';

describe('getPackageDatas', () => {
  it('should find nothing in empty file', () => {
    const fileContent = '';
    expect(getPackageDatas({source: fileContent, unpkgPrefix: 'unpkg'}).length).to.equal(0);
  });

  it('should find one in file with 1 link', () => {
    const package1 = 'package1';
    const version1 = '1.1.1';
    const fileContent = `unpkg/${package1}@${version1}`;
    const result = getPackageDatas({source: fileContent, unpkgPrefix: 'unpkg'});
    expect(result.length).to.equal(1);
    expect(result[0].packageName).to.equal(package1);
    expect(result[0].version).to.equal(version1);
  });

  it('should find one in file with 2 link', () => {
    const package1 = 'package1';
    const version1 = '1.1.1';
    const package2 = 'package2';
    const version2 = '1.1.2';
    const fileContent = `unpkg/${package1}@${version1}\nunpkg/${package2}@${version2}`;

    const result = getPackageDatas({source: fileContent, unpkgPrefix: 'unpkg'});

    expect(result.length).to.equal(2);
    expect(result[1].packageName).to.equal(package2);
    expect(result[1].version).to.equal(version2);
  });

  it('should work for unpkg.com', () => {
    const package1 = 'package1';
    const version1 = '1.1.1';
    const fileContent = `unpkg.com/${package1}@${version1}`;

    const result = getPackageDatas({source: fileContent, unpkgPrefix: 'unpkg.com'});

    expect(result.length).to.equal(1);
  });

  it('should work for placeholder version x.x.x version', () => {
    const package1 = 'package1';
    const version1 = 'x.x.x';
    const fileContent = `unpkg.com/${package1}@${version1}`;

    const result = getPackageDatas({source: fileContent, unpkgPrefix: 'unpkg.com', versionPlaceholder: version1});

    expect(result.length).to.equal(1);
  });
});
