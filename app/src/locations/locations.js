'use strict';

var module = angular.module('dashboardApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/locations',
    {
      templateUrl: '/src/locations/locations.tpl.html',
      controller: 'LocationsCtrl',
      authRequired: true
    })
});

module.controller('LocationsCtrl',
  function LocationsCtrl($scope, apiService, colorService) {
    $scope.color = colorService.orange.dark;

    apiService.UsersLocation.get(function(res) {
      $scope.users = res.data;
    });
  }
);