var mongoose = require('mongoose');

module.exports = function(options) {
  var virgilio = this;
  var Promise = virgilio.Promise;
  var Hooker = mongoose.model('Hooker', { id: String
                                    , username: String
                                    , sex: String
                                    , interestedIn: String
                                    , age: Number
                                    , shifts: [{
                                      from: Date,
                                      to: Date
                                    }]
                                  });
  Hooker = Promise.promisifyAll(Hooker);
    virgilio
        .http({
            '/api/hookers': {
                GET: {
                    handler: 'hooker.all',
                    error: function(error, res) {
                        virgilio.log.trace('Hookers retrieve failed with error: %s',
                                error.message);
                        res.send(404, {
                            "error": {
                              "message": "No hooker found"
                            }
                        });
                    }
                }
            },
            '/api/hookers': {
              GET: {
                handler: 'hooker.getAllAvailableNow',
                transform: function(req) {
                  return new Date();
                },
                error: function(err, res) {
                  virgilio.log.trace('Hookers retrieve failed with error: %s',
                          err.message);
                  res.send(404, {
                      "error": {
                        "message": "No hooker found...not your lucky day!"
                      }
                  });
                }
              }
            }
        });

    virgilio = virgilio.namespace('hooker')
        .defineAction('all', getAll)
        .defineAction('getAllAvailableNow', getAllAvailableNow)
        .defineAction('isGirlAvailableNow', isGirlAvailableNow);


    function getAll() {
      return [
        {
          name: "hooker1",
          id: '123456'
        }
      ];
    }

    function getAllAvailableNow(now) {
      console.log(now);
      return Hooker.findAsync({
        'shifts.from': { $lte: now },
        'shifts.to': { $gte: now }
      }).then(function(girls) {
        console.log(girls);
        return girls;
      });
    }

    function isGirlAvailableNow(girlId, now) {
      return Hooker.findAsync({
        'shifts.from': { $lt: now },
        'shifts.to': { $gt: now },
        'id': girlId
      }).then(function(girls) {
        return girls;
      });
    }
};
