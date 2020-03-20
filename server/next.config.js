module.exports = {
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
}
