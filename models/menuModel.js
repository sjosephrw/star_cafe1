const mongoose = require('mongoose');

// const Category = require('./categoryModel'); 
const Product = require('./productModel'); 
//https://stackoverflow.com/questions/16641210/mongoose-populate-with-array-of-objects-containing-ref
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Menu must have a name.'],
        unique: true,
        trim: true
    },
    //wont work use virtual populate
    // products: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Product'
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    }     
}, { toJSON: { virtuals: true } });//https://mongoosejs.com/docs/populate.html#populate-virtuals

menuSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    // Category.remove({menu: this._id}).exec();    
    Product.remove({menu: this._id}).exec();
    next();
});

//VIRTUAL PROPERTIES , reviews is the name of the virtual property
//to get the reviews for a tour we could write a query to do it manually, but we are creating
//a child ref. as a virtual property that will store the reviews data in a virtual array that
//wont be persisted in the DB, but will only show in the output.
//https://mongoosejs.com/docs/populate.html#populate-virtuals 
menuSchema.virtual('products', {
    ref: 'Product',//the child reference.
    foreignField: 'menu',//the tour field in the reviews collection (The 2 fields to join)
    localField: '_id',//the _id field in the Tour Collection (The 2 fields to join)
    // If `justOne` is true, 'products' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});

// menuSchema.post('remove', function(doc) {
//     Category.remove({ menu: doc._id }).exec();
//     Product.remove({ menu: doc._id }).exec();    
// });

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;