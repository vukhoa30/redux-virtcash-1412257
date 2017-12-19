var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('users', new Schema({ 
  email: String, 
  hash_password: String, 
}));