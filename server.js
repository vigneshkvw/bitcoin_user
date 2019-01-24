var express = require('express');
var app = express();
process.env.HTTPS = 'true';
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');


var methodOverride = require('method-override');


const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};
mongoose.Promise = global.Promise;

var connectionString = 'mongodb://vignesh:made2win@ds111025.mlab.com:11025/bitcoin';

mongoose.connect(connectionString, option);

// Add those events to get more info about mongoose connection:



// Connected handler
mongoose.connection.on('connected', function (err) {
    console.log("Connected to DB using chain: " + connectionString);
});

// Error handler
mongoose.connection.on('error', function (err) {
    console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
    console.log("Invalid " + connectionString);
});



var User = require('./src/api/model/userModel');
var Product = require('./src/api/model/productModel');
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

var userRoutes = require('./src/api/route/userRoutes');
userRoutes(app);


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(3035, function () {
    console.log('app is running on port 3034');
});
