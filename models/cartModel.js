const mongoose = require('mongoose');

//https://stackoverflow.com/questions/16641210/mongoose-populate-with-array-of-objects-containing-ref
const cartSchema = new mongoose.Schema({
  user: {
    //Parent referencing
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User ID not supplied.']      
  },
  cart: {
    items: [
      {
        productId: {type: mongoose.Schema.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true}
      }
    ]   
  },
  total: Number    
});

cartSchema.methods.addToCart = function(product){

  //check if the product exixts in the cart if it does get it's index
  const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
  });
    
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {//product exists in cart increment qty
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;//inc. qty. by 1
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {//new item added to cart
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();  
}

cartSchema.methods.removeFromCart = function(product){
  const updatedCartItems = this.cart.items.filter(items => {
    return items.productId.toString() !== product;
  });

  this.cart.items = updatedCartItems;
  return this.save();

}

cartSchema.methods.clearCart = function(){
  this.cart = { items: [] };
  return this.save();
}

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;  