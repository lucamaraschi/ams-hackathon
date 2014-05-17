AmsHackathon.AuthManager = Ember.Object.extend({

  user: AmsHackathon.User.create(),

  init: function() {
    this._super();
  },

  login: function(data, callback) {
    var self = this;
    AmsHackathon.ApiManager.login(data, function(data) {
      callback(null, data);
    }, function(jqXHR, textStatus) {
      callback(textStatus, null);
    });
  },

  logout: function(callback) {
    this.user.destroy();
  },

  reset: function() {
  }

});
