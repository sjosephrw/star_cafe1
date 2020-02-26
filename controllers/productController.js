const Product = require('../models/productModel');

//controllers
const factory = require('./handlerFactory');

//https://stackoverflow.com/questions/12821596/multiple-populates-mongoosejs
//https://stackoverflow.com/a/32473842

//https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call/45940863
//https://stackoverflow.com/a/21100156
exports.getAllProducts = factory.getAll(Product, 'Get products', [{path:'menu', select:'_id name'}]);

exports.createProduct = factory.createOne(Product);

exports.getProduct = factory.getOne(Product, 'Get product', [{path:'menu', select:'_id name'}]);

exports.updateProduct = factory.updateOne(Product, 'Update product');

exports.deleteProduct = factory.deleteOne(Product, 'Delete product');