var Sequelize = require('sequelize');
var db = new Sequelize('beerly', 'root', '');
var bcrypt = require('bcrypt-nodejs');

/////////////////////////////////////////////////////////////////

var Customers = db.define('Customers', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  phonenumber: Sequelize.STRING,
  location: Sequelize.STRING
});

Customers.beforeCreate(function(user, options, cb) {
  return bcrypt.hash(user.password, null, null, function(err, hashedPw) {
    if (!err) {
      user.password = hashedPw;
      cb(null, options);
    } else {
      throw err;
    }
  });
});

/////////////////////////////////////////////////////////////////

var Drivers = db.define('Drivers', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

Drivers.beforeCreate(function(driver, options, cb) {
  return bcrypt.hash(driver.password, null, null, function(err, hashedPw) {
    if (!err) {
      driver.password = hashedPw;
      cb(null, options);
    } else {
      throw err;
    }
  });
});

/////////////////////////////////////////////////////////////////

var Transactions = db.define('Transactions', {
  orderItems: Sequelize.STRING,
  totalCost: Sequelize.DECIMAL,
  transactionTime: Sequelize.DATE,
});

Transactions.belongsTo(Customers, { foreignKey: 'customer'});
Customers.hasMany(Transactions);

/////////////////////////////////////////////////////////////////

var Deliveries = db.define('Deliveries', {
  supplyAddresses: Sequelize.TEXT,
  deliveryAddress: Sequelize.STRING,
  deliveryStatus: Sequelize.STRING,
  deliveryTime: Sequelize.DATE
});

Deliveries.belongsTo(Customers, { foreignKey: 'customer'});
Customers.hasMany(Deliveries);

Deliveries.belongsTo(Drivers, { foreignKey: 'driver'});
Drivers.hasMany(Deliveries);

/////////////////////////////////////////////////////////////////

var ProductRatings = db.define('ProductRatings', {
  productId: Sequelize.STRING,
  productName: Sequelize.STRING,
  productDescription: Sequelize.TEXT,
  productAbv: Sequelize.STRING,
  productIsOrganic: Sequelize.STRING,
  productStyleId: Sequelize.STRING,
  productBrewery: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

ProductRatings.belongsTo(Customers, { foreignKey: 'customer'});
Customers.hasMany(ProductRatings);

Customers.sync();
Drivers.sync();
Transactions.sync();
Deliveries.sync();
ProductRatings.sync();

exports.Customers = Customers;
exports.Drivers = Drivers;
exports.Transactions = Transactions;
exports.Deliveries = Deliveries;
exports.ProductRatings = ProductRatings;
