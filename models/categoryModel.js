// const mongoose = require('mongoose');

// const Product = require('./productModel'); 

// //https://stackoverflow.com/questions/16641210/mongoose-populate-with-array-of-objects-containing-ref
// const categorySchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: [true, 'A Category must have a name.'],
//       unique: true,
//       trim: true
//     },
//     image: String,
//     menu: {
//       //Parent referencing
//       type: mongoose.Schema.ObjectId,
//       ref: 'Menu',
//       required: [true, 'Category must belong to a Menu.']      
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     }     
// });

// //https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose
// categorySchema.pre('remove', function(next) {
//     // 'this' is the client being removed. Provide callbacks here if you want
//     // to be notified of the calls' result.  
//     Product.remove({category: this._id}).exec();
//     next();
// });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;        