import {getOptions} from 'loader-utils';
import {resolveUnpkg} from './resolveUnpkg';

module.exports = function loader(source) {
  const options = getOptions(this); //tslint:disable-line

  source = resolveUnpkg(source, options);

  return source;
};
