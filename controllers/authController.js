const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

const tcWrapper = require('../utils/reusableTryCatchUtils');
const { ErrorHandler } = require('../utils/errorUtils');
const { createJWTToken } = require('../utils/jwtUtils');


exports.signup =  tcWrapper( async (req, res, next) => {

    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const user = await User.findById({ _id: newUser._id });

    //const token = createJWTToken(user._id);

    //https://stackoverflow.com/questions/55696324/how-to-hide-a-field-in-the-callback-of-document-save-in-mongoose
    //We are hiding the password and confirm password after saving in DB, using post save MW
    // return the JWT token for the future API calls
    res.status(201).json({
      status: 'success',
      message: 'You have been registered, please Login!',
      // token,
      data: {
        user
      }
    });

    // // const url = 'http://localhost:3000/me';
    // const url = `${req.protocol}://${req.hostname}:${req.port}/me`;//my account
    // // console.log(url);

    // await new Email(newUser, url).sendWelcome();
    // // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    // //     expiresIn: process.env.JWT_EXPIRES_IN
    // // });

    // createSendToken(newUser, 201, req, res);    

});

exports.login = tcWrapper( async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorHandler(400, 'Please provide a email and password!.'))

  //0.1 get email of user
  const user = await User.findOne({ email: email }).select('password'); 
  if (!user) return next(new ErrorHandler(401, 'Invalid username or password'));

  // console.log(user)

  //check whether password is valid
  // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
  const result = await bcrypt.compare(password, user.password);
  if (!result) return next(new ErrorHandler(401, 'Invalid username or password'));

  //https://stackoverflow.com/questions/48197334/cant-use-delete-operator-on-mongoose-query-results
  //https://stackoverflow.com/a/48197599
  //http://mongoosejs.com/docs/api.html#document_Document-toObject
  const newUserObj = user.toObject();
  delete newUserObj.password;//remove the password from the user object so that the response obj. does not display it

  //1. does email and password exists
  //https://stackoverflow.com/questions/9548186/mongoose-use-of-select-method
  //https://stackoverflow.com/a/56096115
  //https://stackoverflow.com/a/12096922//also read this.
  // const user = await User.findOne({ email: email, password: password }).select('-password -passwordConfirm');
  
  //2. send token
  const token = createJWTToken(user._id);

  res.status(200).json({
    status: 'success',
    message: 'You are now logged in, Redirecting in 3 Seconds!',
    token,
    data: {
      user: newUserObj
    }
  });

});

exports.accessLevel = (...roles) => {
    return (req, res, next) => {
        //if the roles array does not include the current users role then do not give access
        //console.log(req.user)

        if (!roles.includes(req.user.role)){
            return next(new ErrorHandler(403, 'You are not authorized to perform this action.'));//403 - forbidden        
        }

        next();//sends us back to the next route handler.
    }
}