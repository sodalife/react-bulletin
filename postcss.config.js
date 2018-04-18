const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  plugins: [
    require('precss')(),
    require('autoprefixer')({
      browsers: ['defaults', 'last 5 iOS versions', '>0% in CN'],
    }),
    !isDevelopment && require('cssnano'),
  ].filter((plugin) => plugin !== false),
}
