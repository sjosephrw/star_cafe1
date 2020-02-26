const Menu = require('../models/menuModel');

//controllers
const factory = require('./handlerFactory');

//I AM NOT POPULATING THE PRODUCTS ARRAY WITH ALL THE PRODUCT DETAILS WHEN CALLING GET ALL CATEGORIES, BUT ONLY THE PRODUCT IDS WILL BE THERE
exports.getAllMenus = factory.getAll(Menu);

exports.createMenu = factory.createOne(Menu);

// exports.getMenu = factory.getOne(Menu, null, 'products');
//https://mongoosejs.com/docs/populate.html#field-selection
exports.getMenu = factory.getOne(Menu, null, { path: 'products', select: '_id name image' });

exports.updateMenu = factory.updateOne(Menu);

exports.deleteMenu = factory.deleteOne(Menu);

//exports.getMenu = factory.getOne(Menu, [{path:'products', select:'_id name image'}]);

