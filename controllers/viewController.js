//utils
const tcWrapper = require('../utils/reusableTryCatchUtils');
// const AppError = require('../utils/appError');

exports.getHomePage = tcWrapper ( async (req, res, next) => {

    res.status(200).render('default/index', {
        title: 'Welcome to Star Cafe',
    });
});

// exports.getIndex = (req, res, next) => {
//   Product.find().then(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/',
//       activeShop: true,
//       csrfToken: req.csrfToken()  
//     });
//   }).catch(err => {
//       console.log(err);
//   });
// };