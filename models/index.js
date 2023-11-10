const sequelize = require('./_database');

// Importation des models
const Product = require('./Product');
const Tag = require('./Tag');
const ShoppingCart = require('./ShoppingCart');
const Order = require('./Order');
const User = require('./User');

// Déclaration des relations
Product.belongsToMany(Tag, { through: 'Product_Tag' });
Tag.belongsToMany(Product, { through: 'Product_Tag' });

Product.belongsToMany(ShoppingCart, {through: 'Shopp_Product'});
ShoppingCart.belongsToMany(Product, {through : 'Shopp_Product'});

Product.belongsToMany(Order, {through: 'Order_Product'});
Order.belongsToMany(Product, {through: 'Order_Product'});

User.hasMany(Order);
Order.belongsTo(User);

// Synchronisation de la base
//sequelize.sync({alter: true});


module.exports = {
    Product: Product,
    Tag: Tag,
    ShoppingCart: ShoppingCart,
    Order: Order,
}
