const Dotenv = require('dotenv-webpack')

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  configureWebpack: {
    // Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    plugins: [
      new Dotenv()
    ],
    resolve: {
      symlinks: false
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    '@coreui/utils',
    '@coreui/vue'
  ]
}
