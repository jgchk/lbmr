const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages], {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.module.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: dev,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]'
              }
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.less$/,
        exclude: /\.module.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: dev }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack'
      }
    )

    return config
  }
})
