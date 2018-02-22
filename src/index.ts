import {getOptions} from 'loader-utils';
import {resolveUnpkg} from './resolveUnpkg';

export default function loader(source) {
  const options = getOptions(this); //tslint:disable-line

  source = resolveUnpkg(source, options);

  return `export default ${ JSON.stringify(source) }`;
}
