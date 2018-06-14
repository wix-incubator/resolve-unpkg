# resolve-unpkg [![Build Status][ci-img]][ci]
[ci-img]:  https://travis-ci.org/wix/resolve-unpkg.svg
[ci]:      https://travis-ci.org/wix/resolve-unpkg

## About
A library that enables you to keep your unpkg links up to date.

## Usage
1. `npm i --save-dev resolve-unpkg`
2. run `resolve-unpkg [optional-config.json]` to resolve all unpkg urls in `index.html`

**Example:**
Given file `index.html`:
```html
<html>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/spectrum-colorpicker@1.6.0/spectrum.css">
    </head>
    <body>
        <script src="https://unpkg.com/jquery@x.x.x/dist/jquery.min.js"></script>
    </body>
</html>
``` 

And the following package versions installed: `jquery: '2.2.1'`, `spectrum-colorpicker: '1.6.1'`

The file will be overwritten and will result in this:

```html
<html>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/spectrum-colorpicker@1.6.1/spectrum.css">
    </head>
    <body>
        <script src="https://unpkg.com/jquery@2.2.1/dist/jquery.min.js"></script>
    </body>
</html>
```

### Webpack Loader

If your code contains a JSON file with the links to unpkg in it the json file can be loaded using the resolve-unpkg loader.

**Example:**

```javscript
...
import scripts from '!resolve-unpkg?versionPlaceholder=a.b.c&onlyByVersionPlaceholder=true!scripts.json';
...

``` 

### Options:

#### Loader

The following options can be configured for the loader:

| Property         | Type       | Required | Description                              | CLI | Loader |
| ---------------- | ---------- | :------: | ---------------------------------------- | :-: | :----: |
| `unpkgPrefix`    | `string`   |   No     | The prefix of the unpkg links (default: `'unpkg.com'`) | Yes | Yes |
| `versionPlaceholder`| `string`   |   No     | A placeholder that will be replaced if present in place of version number (default: `'x.x.x'`) | Yes | Yes |
| `onlyByVersionPlaceholder`  | `boolean`   |   Npo     |  If to ignore set version numbers (default: `true`)     | Yes | Yes |
| `files`    | `string[]`   |   No     | Path to file to resolve on (default: `['index.html']`) | Yes | No |
| `dist`    | `string`   |   No     | Folder to create/replace with result (default: overwrite original) | Yes | No |


### Example config file
```
{
  "unpkgPrefix": "/unpkg",
  "files": ["index.vm", "index.ejs"],
  "dist": "dist/"
}
```

