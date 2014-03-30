'use strict';

var module = angular.module('dashboardApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/plans',
    {
      templateUrl: '/src/plans/plans.tpl.html',
      controller: 'PlansCtrl',
      authRequired: true
    })
});

module.controller('PlansCtrl',
  function PlansCtrl($scope, colorService) {
    var plansUsage = [
      {
        name: 'Free',
        isFree: true,
        isMostExpensive: false,
        storageUsage: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9],
        bandwidthUsage: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9],
        sharedQuotaUsage: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
      },
      {
        name: 'Pro',
        isFree: false,
        isMostExpensive: false,
        storageUsage: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2],
        bandwidthUsage: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2],
        sharedQuotaUsage: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2]
      },
      {
        name: 'Business',
        isFree: false,
        isMostExpensive: true,
        storageUsage: [9, 2, 7, 5, 19, 12, 17, 6, 14, 10, 6, 8],
        bandwidthUsage: [40, 22, 18, 87, 29, 112, 117, 60, 124, 10, 69, 86],
        sharedQuotaUsage: [12, 28, 35, 54, 39, 19, 127, 24, 4, 100, 86, 42]
      }
    ];

    $scope.dataChart1 = [];
    $scope.dataChart2 = [];
    $scope.dataChart3 = [];
    $scope.dataChart5 = [];

    for (var i = 0, l = plansUsage.length; i < l; i++) {
      $scope.dataChart1.push({
        name: plansUsage[i].name,
        color: plansUsage[i].isFree === true ?
          Highcharts.Color(colorService.grey.normal).brighten(i * 0.10).get() : Highcharts.Color(colorService.blue.normal).brighten(i * 0.10).get(),
        data: plansUsage[i].storageUsage
      });

      $scope.dataChart2.push({
        name: plansUsage[i].name,
        color: plansUsage[i].isFree === true ?
          Highcharts.Color(colorService.grey.normal).brighten(i * 0.10).get() : Highcharts.Color(colorService.orange.normal).brighten(i * 0.10).get(),
        data: plansUsage[i].bandwidthUsage
      });

      $scope.dataChart3.push({
        name: plansUsage[i].name,
        color: plansUsage[i].isFree === true ?
          Highcharts.Color(colorService.grey.normal).brighten(i * 0.10).get() : Highcharts.Color(colorService.black.normal).brighten(i * 0.10).get(),
        data: plansUsage[i].sharedQuotaUsage
      });

      if (plansUsage[i].isMostExpensive) {
        $scope.mostExpPlan = plansUsage[i];
        $scope.dataChart4 = [
          {
            name: 'Storage',
            color: colorService.blue.normal,
            data: plansUsage[i].storageUsage
          },
          {
            name: 'Bandwidth',
            color: colorService.orange.normal,
            data: plansUsage[i].bandwidthUsage
          },
          {
            name: 'Shared Quota',
            color: colorService.black.normal,
            data: plansUsage[i].sharedQuotaUsage
          }
        ]
      }

      $scope.dataChart5.push({
        name: plansUsage[i].name,
        value: Math.round((plansUsage[i].storageUsage[11] + plansUsage[i].bandwidthUsage[11] + plansUsage[i].sharedQuotaUsage[11]) / 3)
      });
    }

  }
);