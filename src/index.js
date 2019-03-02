
// eslint-disable-next-line max-params
export default (
    test, nodeTarget, prodBrowsers, devBrowsers, extraPlugins=[]
)=> {
  const config = {
    // Common to all envs below.
    plugins: [
      // Makes sure babel does not include the same code snipped in each file,
      // but imports helpers from a single module.
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', {legacy: true}],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-optional-catch-binding',
      '@babel/plugin-proposal-throw-expressions',
      ...extraPlugins
    ],

    presets: ['@babel/preset-react'],

    env: {
      // Used as the default for running babel-node scripts
      development: {
        sourceMaps: 'both',
        presets: [
          ['@babel/preset-env', {
            useBuiltIns: 'usage',
            targets: {
              node: nodeTarget
            }
          }]
        ]
      },
      // Default env used for webpack when e.g. running the dev server.
      // It will minimize transcompilation to target the
      // latest browsers. This should allow easier debugging.
      'webpack-dev': {
        sourceMaps: 'both',
        presets: [
          ['@babel/preset-env', {
            modules: false,
            useBuiltIns: 'entry',
            targets: {
              browsers: devBrowsers
            }
          }]
        ]
      },
      // Alternative env used for debugging and development.
      // It targets all production browsers but with all dev goodies from above.
      'webpack-dev-prod': {
        sourceMaps: 'both',
        presets: [
          ['@babel/preset-env', {
            modules: false,
            useBuiltIns: 'entry',
            targets: {
              browsers: prodBrowsers
            }
          }]
        ]
      },
      // The default used by webpack to package our application for production.
      production: {
        presets: [
          ['@babel/preset-env', {
            modules: false,
            useBuiltIns: 'entry',
            targets: {
              browsers: prodBrowsers
            }
          }]
        ]
      }
    }
  };

  if (test) {
    // Jest runs with NODE_ENV=test and will use the following.
    // We target the current node version to minimize transcompilation.
    // This should speed up the test run and make it more debugable.
    config.env.test = {
      sourceMaps: 'both',
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: nodeTarget
          }
        }]
      ],
      plugins: [
        'transform-amd-to-commonjs',
        'dynamic-import-node'
      ]
    };
  }

  return config;
};
