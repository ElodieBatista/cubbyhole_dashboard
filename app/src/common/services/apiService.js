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
    }),
    AuthError: {
      POST: {
        401: 'Please, check your emails to verify your address.',
        403: 'Your account has been deactivated by our administrator. For more information, please send an email to cubbyhole.contact@gmail.com.',
        404: 'Incorrect email or password.',
        422: 'This email address already exists. Please, try another one.'
      }
    }
  };
});