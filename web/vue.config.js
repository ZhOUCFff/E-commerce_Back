module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@store'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/E-commerce_back' : '/',
  outputDir: __dirname + '/../server/admin'
}