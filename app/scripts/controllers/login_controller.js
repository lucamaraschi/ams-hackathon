AmsHackathon.LoginController = Ember.Controller.extend({

  attemptedTransition: null,

  actions: {
    login: function() {
      this.get('authmanager').login(
        {
        'username': this.get('username'),
        'password': this.get('password')
        },
      function(err, data) {
        if(!err) {
          var attemptedTransition = self.get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            self.set('attemptedTransition', null);
          } else {
            // Redirect to 'home' by default.
            self.transitionToRoute('home');
          }
        }
      });
    }
  }

});
