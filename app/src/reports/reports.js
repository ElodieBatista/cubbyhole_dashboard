'use strict';

var module = angular.module('dashboardApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/reports',
    {
      templateUrl: '/src/reports/reports.tpl.html',
      controller: 'ReportsCtrl',
      authRequired: true
    })
});

module.controller('ReportsCtrl',
  function ReportsCtrl($scope, apiService) {
    apiService.Plans.get(function(res) {
      $scope.plans = res.data;
    });

    $scope.locations = ['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America'];
    $scope.times = ['2014'];

    $scope.createReport = function(form) {
      console.log(form);
    };
  }
);