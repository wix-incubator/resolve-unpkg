import {expect} from 'chai';
import * as mock from 'mock-fs';
import {findCurrentVersion} from '../src/findCurrentVersion';

describe('FindCurrentVersion', () => {
  const package1Name = 'package1';
  const package1Version = '1.0.0-beta.3';
  const parent = '@nested';
  const package2Name = 'package2';
  const package2Version = '1.0.1';
  beforeEach(() => {
    mock({
      node_modules: {
        [package1Name]: {
          'package.json': JSON.stringify({version: package1Version})
        },
        [parent]: {
          [package2Name]: {
            'package.json': JSON.stringify({version: package2Version})
          }
        }
      }
    });
  });

  it('should find version of given package', () => {
    expect(findCurrentVersion(package1Name)).to.equal(package1Version);
  });

  it('should return undefined when package does not exist', () => {
    expect(findCurrentVersion('nonExistentPackage')).to.equal(undefined);
  });

  it('should return version of nested package', () => {
    expect(findCurrentVersion(parent + '/' + package2Name)).to.equal(package2Version);
  });
});
