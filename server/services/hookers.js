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
      return Hooker.find({
        'shifts.from': { $gt: now },
        'shifts.to': { $lt: now }
      }).then(function(girls) {
        return girls;
      });
    }

    function isGirlAvailableNow(girlId, now) {
      return Hooker.find({
        'shifts.from': { $gt: now },
        'shifts.to': { $lt: now },
        'id': girlId
      }).then(function(girls) {
        return girls;
      });
    }
};
