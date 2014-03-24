'use strict';

var module = angular.module('dashboardApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/login',
    {
      templateUrl: '/src/login/login.tpl.html',
      controller: 'LoginCtrl'
    })
});

module.controller('LoginCtrl',
  function LoginCtrl($rootScope, $scope, apiService, $location, $http) {
    $scope.signin = function(form) {
      apiService.Auth.post({'email':form.email, 'pass':form.pass, 'rememberMe':form.rememberMe}, function(res) {
        localStorage.setItem('cubbyhole-dashboardApp-token', res.profile.token);
        localStorage.setItem('cubbyhole-dashboardApp-profile', JSON.stringify(res.profile));
        $http.defaults.headers.common['X-Cub-AuthToken'] = res.profile.token;
        $rootScope.profile = res.profile;

        $location.path('/users');
      }, function(err) { $scope.errorShow(err); });
    };
  }
);