const mongoose = require('mongoose')

const database = (db_uri) => {
  mongoose.connect(db_uri)
    .then(() => console.log('INFO - MongoDB connected successfully'))
    .catch((error) => console.log('ERROR - MongoDB not connected : ' + error))
}


module.exports = database
