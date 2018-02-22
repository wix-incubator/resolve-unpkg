#! /usr/bin/env node

import * as fs from 'fs';
import {resolveUnpkgFromFS} from './resolveUnpkgFromFS';

const configFile = process.argv[2];

let config = configFile ? JSON.parse(fs.readFileSync(configFile, 'utf-8')) : {};

resolveUnpkgFromFS(config);
