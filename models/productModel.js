const mongoose = require('mongoose');
//https://stackoverflow.com/questions/16641210/mongoose-populate-with-array-of-objects-containing-ref
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A Product must have a name.'],
      unique: true,
      trim: true
    },
    menu: {
      //Parent referencing
      type: mongoose.Schema.ObjectId,
      ref: 'Menu',
      required: [true, 'a Product must belong to a Menu.']      
    },    
    image: String,
    description: {
      type: String,
      required: [true, 'A Product must have a Description.']
    },
    ingredients: {
      type: String,
      required: [true, 'A Product must have Ingredients.']
    },
    allergy: {
      type: String,
      required: [true, 'A Product must have Allergy Info.']
    },
    price: {
      type: Number,
      required: [true, 'A Product must have a price.']      
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }     
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;  

//https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose