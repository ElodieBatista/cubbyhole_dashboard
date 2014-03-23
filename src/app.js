'use strict';

angular.module('dashboardApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngAnimate'
  ])
  .constant('conf', {
    'epApi': 'http://localhost:3000'
  })
  .config(function(conf, $locationProvider, $httpProvider, $routeProvider, $sceDelegateProvider, $provide) {
    $httpProvider.defaults.headers.common['X-Cub-AuthToken'] = localStorage.getItem('cubbyhole-webapp-token');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

    function comesFromCubbyhole(url) {
      return (url.indexOf(conf.epApi) !== -1);
    }

    $provide.factory('httpInterceptor', function($q, $rootScope, $location) {
      return {
        'request': function(config) {
          if (comesFromCubbyhole(config.url)) {
            $rootScope.displaySpinner = true;
          }
          return config || $q.when(config);
        },

        'response': function(response) {
          if (response.config.url.indexOf(conf.epApi) !== -1) {
            $rootScope.displaySpinner = false;
          }
          return response || $q.when(response);
        },

        'responseError': function (response) {
          if (comesFromCubbyhole(response.config.url)) {
            $rootScope.displaySpinner = false;

            if (response.status === 401) {
              console.log('401 detected from the server, exiting local session.');
              $location.path('/logout');
            }
          }
          return $q.reject(response);
        }
      };
    });

    $httpProvider.interceptors.push('httpInterceptor');

    $routeProvider.otherwise({redirectTo: '/users'});

    $sceDelegateProvider.resourceUrlWhitelist([conf.epApi + '**', 'self'])
  })
  .run(function($rootScope, $location, $window) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.authRequired === true && !$rootScope.getToken()) {
        $window.location.href = 'index.html';
      }
    });

    $rootScope.getToken = function() {
      if ($rootScope.token) {
        return $rootScope.token;
      } else if (localStorage.getItem('cubbyhole-webapp-token')) {
        $rootScope.token = localStorage.getItem('cubbyhole-webapp-token');
        return $rootScope.token;
      } else {
        return null;
      }
    };

    $rootScope.getProfile = function() {
      if ($rootScope.profile) {
        return $rootScope.profile;
      } else if (localStorage.getItem('cubbyhole-webapp-profile')) {
        $rootScope.profile = JSON.parse(localStorage.getItem('cubbyhole-webapp-profile'));
        return $rootScope.profile;
      } else {
        return null;
      }
    };
  });