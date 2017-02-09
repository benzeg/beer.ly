var db = require('../index.js');

exports.saveDeliveries = function(transaction, cb) {
  var orderItems = transaction.orderItems;
  var totalCost = transaction.totalCost;
  var transactionTime = transaction.transactionTime;
  //deliveryStatus: N -> new order, no driver assigned
	//	  I -> in process of being delivered, driver assigned
	//	  D -> order delivered
  db.Transactions.create(
  	{orderItems: orderItems,
	 totalCost: totalCost,
	 transactionTime: transactionTime,
	 deliveryStatus: 'N',
	 deliveryTime: null})
	.then(function() {
		cb(null, );
	}).catch(function(err) {
		cb(err);
	})
};

exports.updateDeliveries = function(delivery, cb) {

};