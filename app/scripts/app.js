var AmsHackathon = window.AmsHackathon = Ember.Application.create({
  ready: function() {
    this.register('auth:current', AmsHackathon.AuthManager, {singleton: true});
    this.inject('controller', 'authmanager', 'auth:current');
    this.inject('route', 'authmanager', 'auth:current');
  },

  LOG_TRANSITIONS: true
  // LOG_TRANSITIONS_INTERNAL: true
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/managers/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
