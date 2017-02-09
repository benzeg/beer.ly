var db = require('../index.js');

exports.saveTransaction = function(transaction, cb) {
<<<<<<< HEAD
  db.Transactions.create(transaction).then(function() {
  	cb(null, );
  }).catch(function(err) {
  	cb(err);
  })
=======

>>>>>>> e8fc4f5c40d6518b45daf0e187ce2a99e26deca4
};