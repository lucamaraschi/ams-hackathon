AmsHackathon.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if(!this.get('authmanager').get('user').get('loggedIn')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  }
});
