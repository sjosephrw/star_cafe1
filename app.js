const path = require('path');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');//to implement Cross Origin Resource Sharing

///////////////// testing only
const Menu = require('./models/menuModel')
// const Category = require('./models/categoryModel')
const Product = require('./models/productModel')
//////////////////////////////

//utils
const { ErrorHandler, handleError } = require('./utils/errorUtils');

//routes
const viewRouter = require('./routes/viewRoutes');
const slideShowRouter = require('./routes/slideShowRoutes');
const menuRouter = require('./routes/menuRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');

const app = express();

//middleware
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

//https://github.com/expressjs/cors
//allow everyone to consume our API
app.use(cors());////to implement Cross Origin Resource Sharing

app.options('*', cors());//allow delete and patch requests to all routes

//app.use(express.json());
//https://stackoverflow.com/questions/47575177/express-req-body-is-empty-in-form-submission
app.use(express.json({ limit: '10kb' }));
//to parse form body data
app.use(express.urlencoded({ extended: true, limit: '10kb' }));//extended to parse more complicated data

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the MIDDLEWARE 👋');
    // console.log(req.body);
    //console.log(req.headers)
    next();
});

// app.use(function (err, req, res, next) {
//     console.log('This is the invalid field ->', err.field)
//     next(err);//when we pass a argument into next express will trigger the new Error() class.
//   })

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(`⏲: ${req.requestTime}`);
    console.log(req.body)
    next();
});

//FRONT END
app.use('/', viewRouter);

app.use('/api/v1/slideShow', slideShowRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/cart', cartRouter);

//////////////////////////////testing only
app.get('/api/v1/menus', async (req, res) => {

    const docs = await Menu.find();

    res.status(200).json({
      data: {
        length: docs.length,
        docs,
      }
    });
});


// app.get('/api/v1/categories', async (req, res) => {

//     const docs = await Category.find();

//     res.status(200).json({
//       data: {
//         length: docs.length,
//         docs,
//       }
//     });
// });


app.get('/api/v1/products', async (req, res) => {

    const docs = await Product.find();

    res.status(200).json({
      data: {
        length: docs.length,
        docs,
      }
    });
});

//////////////////////////////////////////
//.all  = all http methods, * = all undefined routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(404, `Sorry the URL - ${req.originalUrl} - was not found on our server. 🌛`));
});

//express global error handling MW
app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;