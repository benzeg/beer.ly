var db = require('../index.js');

exports.saveDelivery = function(transaction, cb) {
  var username = transaction.username;
  var supplyAddresses = transaction.supplyAddresses;
  supplyAddresses = JSON.stringify(supplyAddresses);
  var deliveryAddress = transaction.deliveryAddress;
  var driverId = 1;

  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	var customerId = user.id;
  	db.Deliveries.create(
  	{supplyAddresses: supplyAddresses,
  	 deliveryAddress: deliveryAddress,
	 deliveryStatus: 'Finding Driver',
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

exports.updateDelivery = function(delivery, cb) {
  //deliveryStatus:
  //"not assigned"
  //"Delivery Job Accepted"
  //"Enroute to Warehouse"
  //"Loading Goods"
  //"Delivered to Customer"

  var jobId = delivery.jobid;
  var deliveryStatus = delivery.deliveryStatus;
  var deliveryTime = null;
  var longitude = delivery.longitude;
  var latitude = deliver.latitude;

  if (deliveryStatus === 'Delivered to Customer') {
  	deliveryTime = new Date();
  }

  db.Deliveries.findOne({where: {id: jobId}})
  .then(function(delivery) {
  	delivery.deliveryStatus = deliveryStatus;
  	delivery.deliveryTime = deliveryTime;
  	delivery.longitude = longitude;
  	delivery.latitude = latitude;
  	delivery.save().then(function(delivery) {
  	  cb(null, delivery);
  	}).catch(function(err) {
  	  cb(err);
  	});
  });
};

exports.getDelivery = function(driver, cb) {
  var username = driver.username;
  console.log('WOPREWROPWEWEPROJRWE');
  db.Drivers.findOne({where: {username: username}})
  .then(function(user) {
  	var driverId = user.id;
  	db.Deliveries.findOne({where: {deliveryStatus: 'Finding Driver', driver: driverId}})
  	.then(function(delivery) {
  	  cb(null, [delivery]);
  	}).catch(function(err) {
  	  cb(err);
  	})
  }).catch(function(err) {
  	cb(err);
  });
};

exports.getDeliveriesStatus = function(customer, cb) {
  var username = customer.username;
  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	var customerId = user.id;
  	db.Deliveries.findAll({where: {customer: customerId}})
  	.then(function(deliveries) {
  	  cb(null, deliveries);
  	}).catch(function(err) {
  	  cb(err);
  	})
  }).catch(function(err) {
  	cb(err);
  });
};