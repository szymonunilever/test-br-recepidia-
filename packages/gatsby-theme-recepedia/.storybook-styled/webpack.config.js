const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../src/components/lib/stories/svgs/inline/');
module.exports = ({ config }) => {
  // console.log(config.module.rules);
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ];

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
    require.resolve('babel-plugin-syntax-dynamic-import'),
  ];

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main'];

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');
  /** Attention: There is configuration src alias for compatibility with site app.
   * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
  config.resolve.alias = {
    src: path.resolve(__dirname, '../src/components/lib/stories'),
  };

  config.module.rules.push({
    test: /\.scss$/,
    loader: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          camelCase: true,
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  });

  const fileLoaderRule = config.module.rules.find(rule =>
    rule.test.test('.svg')
  );
  fileLoaderRule.exclude = pathToInlineSvg;
  // @todo externalize svg loader config
  config.module.rules.push({
    test: /\.svg$/,
    include: pathToInlineSvg,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
        },
      },
      {
        loader: 'url-loader',
      },
    ],
  });

  return config;
};
