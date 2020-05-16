const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const keys = require('../keys')

require('../models/user')
require('../models/product')
require('../models/category')
require('../models/product-hero')
require('../models/blog')

exports.initSessionStore = function() {
  const store = new MongoDBStore({
    uri: keys.DB_URI,
    collection: 'eincodeSessions'
  })

  store.on('error', (error) => console.log(error))

  return store
}

exports.connect = function() {
  return mongoose
    .connect(keys.DB_URI, { useNewUrlParser: true })
    .then(() => console.log('DB Connected!'))
    .catch((err) => console.log(err))
}
