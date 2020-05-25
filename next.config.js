const path = require('path')
const withSass = require('@zeit/next-sass')

// require('dotenv').config()

module.exports = withSass()

// module.exports = {

//   // env: {
//   //   API_URL: 'http://localhost:1337',
//   // },

//   // webpack: config => {
//   //   config.resolve.alias['components'] = path.join(__dirname, 'components')
//   //   config.resolve.alias['public'] = path.join(__dirname, 'public')

//   //   return config
//   // }
// }