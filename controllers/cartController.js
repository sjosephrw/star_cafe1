const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const tcWrapper = require('../utils/reusableTryCatchUtils');
const { ErrorHandler } = require('../utils/errorUtils');

exports.getCart = tcWrapper ( async (req, res, next) => {

  const cart = await Cart.findOne({ user: req.user._id }).populate([{path:'cart.items.productId', select:'-description -ingredients -allergy -price'}]);

    res.status(200).json(
      {
      status: 'success', 
      requestedAt: req.requestTime,
      results: cart.length,
      data: {
          data: cart
      }
  });

});

exports.addToCart = tcWrapper ( async (req, res, next) => {

  const prodId = req.params.id;

  const product = await Product.findById(prodId);
  const cart = await Cart.findOne({ user: req.user._id });

  let cartDetails = null;

  if (!cart) {
    cartDetails = await Cart.create({ user: req.user._id, "cart.items": [{productId: product._id, quantity: 1}] });
  } else {
    cartDetails = await cart.addToCart(product);
  }

  res.status(200).json(
    {
    status: 'success',
    message: 'Added to Cart!.', 
    data: {
        data: cartDetails
    }
  });

});


