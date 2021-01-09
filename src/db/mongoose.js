const mongoose = require('mongoose');

var uriString = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/shorten-urls';

mongoose.connect(uriString,{useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 2000})
