const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

//https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call
String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

const DB = process.env.MONGO_DB_CONNECTION_URI.allReplace({'<USERNAME>': process.env.MONGO_DB_USERNAME, '<PASSWORD>': process.env.MONGO_DB_PASSWORD});

mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
    // ,
    // useUnifiedTopology: true
}).then((con) => {
    // console.log(con.connections);
    // spinner.succeed('Connected to Database successfully 💽');
    console.log('Connected to Database successfully 💽');
}).catch((err) => {
    console.error(err);
    throw new Error('Failed to connect to Database. 💥 💥');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on PORT ${port} 🏃 🏃 🏃 🏃`);
});

