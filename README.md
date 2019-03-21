# babel-config-react
A configurable @babel plugin for react applications

## Usage

> ```bash
> npm i -D @skan-io/babel-config-react
> ```

`babel.config.js`

```js
const config = require('@skan-io/babel-config-react');

module.exports = {
  ...config.default(
    true, // Use jest testing env
    'current', // Node version to target
    ['last 2 versions','not IE < 11'], // Browser targets
    ['last 1 Chrome versions'], // Development browser targets
    ['@babel/plugin-transform-runtime'] // Extra babel plugins
    // NOTE: these will still need installation
  )
};
```
