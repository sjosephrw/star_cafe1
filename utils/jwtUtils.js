//https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const { ErrorHandler } = require('../utils/errorUtils');
const tcWrapper = require('../utils/reusableTryCatchUtils');

const checkToken = tcWrapper( async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (!token) {
      return next(new ErrorHandler(401, 'You are not logged in, please Login!.'));
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

      if (err) {
        return next(new ErrorHandler(401, 'The JWT token is invalid!.'));

      //* 1000 to convert to miliseconds
      } else {

        //console.log(decoded);
        const { exp } = decoded;//to check if the jwt has expired otherwise status error 500 respose code

        if (Date.now() >= exp * 1000){//https://stackoverflow.com/questions/51292406/jwt-check-if-token-expired
      //https://stackoverflow.com/a/51293316
      ////to check if the jwt has expired otherwise status error 500 respose code
        return next(new ErrorHandler(401, 'The JWT token has expired, please login again!.'));
        }

      /*
            { data: '5e4e60418a279d014ed6f3ee',
        iat: 1582346116,
        exp: 1590122116 }
      */  
      //the decoded JWT holds the userId as a data property

        const currentUser = await User.findById(decoded.data);
        req.user = currentUser;

        // req.decoded = decoded;
        next();
      }
    });
  }
});

const createJWTToken = (data) => {

  let token = jwt.sign({ data },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN // expires in 24 hours
    }
  );  

  return token;
}

module.exports = {
  checkToken: checkToken,
  createJWTToken: createJWTToken
}