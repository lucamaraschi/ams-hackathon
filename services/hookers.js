var mongoose = require('mongoose');

module.exports = function(options) {
  var virgilio = this;
  var Hooker = mongoose.model('Hooker', { id: String
                                    , username: String
                                    , password: String
                                    , sex: String
                                    , interestedIn: String
                                    , age: Number
                                  });

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
        .defineAction('all', getAll);


    function getAll() {
      return [
        {
          name: "hooker1"
        }
      ];
    }
};
