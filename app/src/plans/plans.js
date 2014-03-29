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
    // % needed
    $scope.dataChart1 = [
      {
        name: 'Free',
        color: colorService.grey.normal,
        data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
      },
      {
        name: 'Pro',
        color: Highcharts.Color(colorService.blue.normal).brighten(0.10).get(),
        data: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2]
      },
      {
        name: 'Enterprise',
        color: Highcharts.Color(colorService.blue.normal).brighten(0.15).get(),
        data: [9, 6, 3, 8, 13, 17, 18, 17, 14, 9, 9, 1]
      },
      {
        name: 'Business',
        color: Highcharts.Color(colorService.blue.normal).brighten(0.20).get(),
        data: [9, 2, 7, 5, 19, 12, 17, 6, 14, 10, 6, 8]
      }
    ];


    var dataChart4 = {
      name: 'Business',
      data:
        [
          {
            name: 'Storage',
            color: colorService.blue.normal,
            data: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2]
          },
          {
            name: 'Bandwidth',
            color: colorService.orange.normal,
            data: [9, 2, 7, 5, 19, 12, 17, 6, 14, 10, 6, 8]
          },
          {
            name: 'Shared Quota',
            color: colorService.black.normal,
            data: [9, 6, 3, 8, 13, 17, 18, 17, 14, 9, 9, 1]
          }
        ]
    };

    $scope.namePlanMostExp = dataChart4.name;
    $scope.dataChart4 = dataChart4.data;


    // % needed
    $scope.dataChart2 = [
      {
        name: 'Free',
        color: colorService.grey.normal,
        data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
      },
      {
        name: 'Pro',
        color: Highcharts.Color(colorService.orange.normal).brighten(0.10).get(),
        data: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2]
      },
      {
        name: 'Enterprise',
        color: Highcharts.Color(colorService.orange.normal).brighten(0.15).get(),
        data: [9, 6, 3, 8, 13, 17, 18, 17, 14, 9, 9, 1]
      },
      {
        name: 'Business',
        color: Highcharts.Color(colorService.orange.normal).brighten(0.20).get(),
        data: [9, 2, 7, 5, 19, 12, 17, 6, 14, 10, 6, 8]
      }
    ];


    // % needed
    $scope.dataChart3 = [
      {
        name: 'Free',
        color: colorService.grey.normal,
        data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
      },
      {
        name: 'Pro',
        color: Highcharts.Color(colorService.black.normal).brighten(0.10).get(),
        data: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2]
      },
      {
        name: 'Enterprise',
        color: Highcharts.Color(colorService.black.normal).brighten(0.15).get(),
        data: [9, 6, 3, 8, 13, 17, 18, 17, 14, 9, 9, 1]
      },
      {
        name: 'Business',
        color: Highcharts.Color(colorService.black.normal).brighten(0.20).get(),
        data: [9, 2, 7, 5, 19, 12, 17, 6, 14, 10, 6, 8]
      }
    ];


    $scope.dataChart5 = [
      {
        name: 'Free',
        value: 67
      },
      {
        name: 'Pro',
        value: 48
      },
      {
        name: 'Business',
        value: 12
      }
    ];
  }
);