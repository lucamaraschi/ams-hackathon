var mongoose = require('mongoose');
var uuid = require('uuid-v4');

module.exports = function(options) {
  var virgilio = this;

  var Promise = virgilio.Promise;
  var Booking = mongoose.model('Booking', { id: String
                                    , girlId: String
                                    , customerId: String
                                    , when: String
                                    , duration: Number
                                    , score: Number
                                  });


  virgilio.http({
    '/api/bookings': {
      POST: {
        handler: 'booking.create',
        transform: function(req) {
          return req.body;
        },
        error: function(error, res) {
          virgilio.log.trace('Booking creation failed with error: %s',
                  error.message);
          res.send(500, {
              "error": {
                "message": "Impossible to create this booking!"
              }
          });
        }
      }
    }
  });

  virgilio = virgilio.namespace('booking')
    .defineAction('create', create);

  function create(booking) {
    // check if the girl is effectively available
    var girl = booking.girlId;

    virgilio.execute('hooker.isGirlAvailableNow', girl, new Date()).then(function(available) {
      Booking.save(booking).then(function(err) {
        console.log('Something fucked up!');
      });
    });
  }
}
