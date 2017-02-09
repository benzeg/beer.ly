var db = require('../index.js');

exports.saveTransaction = function(transaction, cb) {
  db.Transactions.create(transaction).then(function() {
  	cb(null, );
  }).catch(function(err) {
  	cb(err);
  })
};
