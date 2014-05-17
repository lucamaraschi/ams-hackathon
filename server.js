var virgilio = require('virgilio')();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookahooker');

virgilio
    .loadModule(require('virgilio-http'))
        .httpUse('bodyParser')
    .loadModule(require('./services/user'))
    .loadModule(require('./services/hookers'));
