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
    },

    UsersNew: $resource(conf.epDbdApi + '/users/new', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersNewToday: $resource(conf.epDbdApi + '/users/new/today', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersNewPayingToday: $resource(conf.epDbdApi + '/users/paying/today', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersTotal: $resource(conf.epDbdApi + '/users/total', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersNewFree: $resource(conf.epDbdApi + '/users/free/new', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersNewPaying: $resource(conf.epDbdApi + '/users/paying/new', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersDelay: $resource(conf.epDbdApi + '/users/delay', {}, {
      'get': {
        method: 'GET'
      }
    }),
    UsersLocation: $resource(conf.epDbdApi + '/users/location', {}, {
      'get': {
        method: 'GET'
      }
    }),

    Plans: $resource(conf.epApi + '/plan', {}, {
      'get': {
        method: 'GET'
      }
    }),
    PlansUsers: $resource(conf.epDbdApi + '/plans/users', {}, {
      'get': {
        method: 'GET'
      }
    }),
    PlansDistribution: $resource(conf.epDbdApi + '/plans/distribution', {}, {
      'get': {
        method: 'GET'
      }
    }),
    PlansUsage: $resource(conf.epDbdApi + '/plans/usage', {}, {
      'get': {
        method: 'GET'
      }
    }),

    Years: $resource(conf.epDbdApi + '/plans/years', {}, {
      'get': {
        method: 'GET'
      }
    }),

    Locations: $resource(conf.epDbdApi + '/location', {}, {
      'get': {
        method: 'GET'
      }
    }),

    Reports: $resource(conf.epDbdApi + '/dynamic/:metric1/:metric2/:metric3', {metric1:'@metric1', metric2:'@metric2', metric3:'@metric3'}, {
      'get': {
        method: 'GET'
      }
    })
  };
});