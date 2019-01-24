
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: {
        type: String,
        default:""
    },
    image: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "0"
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('products', productSchema);