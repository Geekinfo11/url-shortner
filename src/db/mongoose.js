const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shorten-urls',{useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 2000})
