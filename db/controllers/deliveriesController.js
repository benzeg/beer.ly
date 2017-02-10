var db = require('../index.js');

exports.saveDeliveries = function(transaction, cb) {
  var customer = transaction.username;
  var supplyAddresses = transaction.supplyAddresses;
  supplyAddresses = JSON.stringify(supplyAddresses);
  var deliveryAddress = transaction.deliveryAddress;
  var driverId = 1;

  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	var customerId = user.id;
  	db.Transactions.create(
  	{supplyAddresses: supplyAddresses,
  	 deliveryAddress: deliveryAddress,
	 deliveryStatus: 'Not assigned',
	 deliveryTime: null,
	 customer: customerId,
	 driver: driverId})
	.then(function(delivery) {
		cb(null, delivery);
	}).catch(function(err) {
		cb(err);
	});
  }).catch(function(err) {
  	cb(err);
  });
};

exports.updateDeliveries = function(delivery, cb) {
  //deliveryStatus:
  //"not assigned"
  //"Delivery Job Accepted"
  //"Enroute to Warehouse"
  //"Loading Goods"
  //"Delivered to Customer"

  var jobId = delivery.jobid;
  var deliveryStatus = delivery.deliveryStatus;
  var deliveryTime = null;

  if (deliveryStatus === 'Delivered to Customer') {
  	deliveryTime = new Date();
  }

  db.Deliveries.findOne({where: {id: jobId}})
  .then(function(delivery) {
  	delivery.deliveryStatus = deliveryStatus;
  	delivery.deliveryTime = deliveryTime;
  	delivery.save().then(function(delivery) {
  	  cb(null, delivery);
  	}).catch(function(err) {
  	  cb(err);
  	});
  })
};