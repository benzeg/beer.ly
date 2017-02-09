var db = require('../index.js');

exports.saveTransaction = function(transaction, cb) {
  db.Transactions.create(transaction).then(function(transaction) {
  	cb(null, transaction);
  }).catch(function(err) {
  	cb(err);
  })
};
