var ApiManager = Ember.Object.extend({

  baseUrl: "/api/",

  login: function(data, successCallback, errorCallback) {
    var self = this;
    self._request({
      url: self.baseUrl + 'users?login',
      method: 'POST',
      data: {
        'username': data.username,
        'password': data.password
      }
    }, successCallback, errorCallback);
  },

  _request: function(request, successCallback, errorCallback) {
    $.ajax({
      url: request.url,
      method: request.method,
      contentType: 'application/json',
      data: JSON.stringify(request.data)
    })
    .done(function(data, textStatus, jqXHR) {
      console.log("[ApiManager] - Request Success: " + request.url);
      successCallback(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("[ApiManager] - Request Fail: " + request.url);
      errorCallback(jqXHR, textStatus);
    });
  }

});

AmsHackathon.ApiManager = ApiManager.create();
