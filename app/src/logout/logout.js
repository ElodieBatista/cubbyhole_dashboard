'use strict';

var module = angular.module('dashboardApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/logout',
    {
      template: '<div></div>',
      controller: 'LogoutCtrl'
    })
});

module.controller('LogoutCtrl',
  function LogoutCtrl($rootScope, $scope, $routeParams, $resource, $location, $http) {
    delete $http.defaults.headers.common['X-Cub-AuthToken'];
    localStorage.removeItem('cubbyhole-dashboardApp-token');
    localStorage.removeItem('cubbyhole-dashboardApp-profile');
    $rootScope.profile = null;
    $location.path('/login');
  }
);