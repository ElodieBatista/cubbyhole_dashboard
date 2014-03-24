'use strict';

var module = angular.module('dashboardApp');

module.factory('apiService', function(conf, $resource) {
  return {
    Auth: $resource(conf.epApi + '/auth/signin', {}, {
      'post': {
        method:'POST',
        params: {
          email: '@email',
          pass: '@pass',
          rememberMe: '@rememberMe'
        }
      }
    })
  };
});