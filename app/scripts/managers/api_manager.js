var ApiManager = Ember.Object.extend({

  baseUrl: "/api/",

  login: function(data, successCallback, errorCallback) {
    var self = this;
    self._request({
      url: self.baseUrl + 'users?login',
      type: 'POST',
      data: {
        'username': data.username,
        'password': data.password
      }
    }, successCallback, errorCallback);
  },

  _request: function(request, successCallback, errorCallback) {
    $.ajax({
      url: request.url,
      type: request.type,
      contentType: 'application/json',
      data: JSON.stringify(request.data),
      success: function(data, textStatus, jqxhr) {
        console.log("Success", data);
      }
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
