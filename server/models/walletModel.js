var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('wallets', new Schema({ 
  userID: Schema.ObjectId, 
  balance: Number
}));