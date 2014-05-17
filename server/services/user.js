var uuid = require('uuid-v4');
var mongoose = require('mongoose');

module.exports = function(options) {
  var virgilio = this;
  var Promise = virgilio.Promise;

  var User = mongoose.model('User', { id: String
                                    , username: String
                                    , password: String
                                    , sex: String
                                    , interestedIn: String
                                    , age: Number
                                  });
  User = Promise.promisifyAll(User);
    virgilio
        .http({
            '/api/users?login': {
                POST: {
                    handler: 'auth.login',
                    transform: function(req) {
                        var body = req.body;
  	                    var username = body.username;
  	                    var password = body.password;
  	                    if(!password || !username) {
  		                    throw new Error('Empty username or passsword');
  	                    }
                        return [username, password];
                    },
                    error: function(error, res) {
                        virgilio.log.trace('Login failed with error: %s',
                                error.message);
                        res.send(403, {
  	                        "error": {
  		                        "message": "Invalid username or password"
  	                        }
                        });
                    }
                }
            }
        });

    virgilio = virgilio.namespace('auth')
        .defineAction('login', login);


    function login(username, password) {
      return User.findOneAsync({ username: username, password: password }).then(function(err, user) {
        if (err) {
          console.log('err');
          console.log(err);
          return err;
        }

        console.log(user);
        return user;
      });
    }
};
