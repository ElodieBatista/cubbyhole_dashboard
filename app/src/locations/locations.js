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
  function LocationsCtrl($scope, colorService) {
    $scope.color = colorService.orange.dark;
    $scope.users = [
      {
        name: 'africa',
        value: 10
      },
      {
        name: 'asia',
        value: 172
      },
      {
        name: 'australia',
        value: 517
      },
      {
        name: 'europe',
        value: 824
      },
      {
        name: 'north_america',
        value: 950
      },
      {
        name: 'south_america',
        value: 23
      }
    ];
  }
);