'use strict';

var module = angular.module('dashboardApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/users',
    {
      templateUrl: '/src/users/users.tpl.html',
      controller: 'UsersCtrl',
      authRequired: true
    })
});

module.controller('UsersCtrl',
  function UsersCtrl($scope, colorService) {
    $scope.dataChart1 = {
      columns: [
        {
          type: 'column',
          name: 'New Users',
          color: colorService.red.normal,
          data: [10, 25, 101, 30, 4, 60, 45, 80, 150, 208, 350, 42]
        }
      ],
      lines: [
        {
          type: 'spline',
          name: 'Total Nb of Users',
          color: colorService.red.normal,
          data: [10, 35, 136, 166, 170, 230, 275, 355, 505, 713, 1063, 1105]
        }
      ]
    };

    $scope.dataChart2 = [
      {
        name: 'Free',
        y: 60,
        color: colorService.grey.normal,
        drilldown: {
          name: 'Free',
          categories: ['Free 1', 'Free 2'],
          data: [25, 35],
          color: colorService.grey.normal
        }
      },
      {
        name: 'Payed',
        y: 40,
        color: colorService.green.normal,
        drilldown: {
          name: 'Payed',
          categories: ['Pro', 'Business', 'Enterprise'],
          data: [10, 15, 15],
          color: colorService.green.normal
        }
      }
    ];


    $scope.dataChart3 = [
      {
        name: 'Stayed Free',
        y: 72,
        color: colorService.blue.normal
      },
      {
        name: 'Became Paying',
        y: 28,
        color: Highcharts.Color(colorService.grey.normal).brighten(0.10).get()
      }
    ];


    $scope.dataChart4 = [
      {
        name: 'Immediately',
        y: 10,
        color: colorService.orange.normal,
        sliced: true,
        selected: true
      },
      {
        name: '1 week',
        y: 18,
        color: Highcharts.Color(colorService.orange.normal).brighten(0.10).get()
      },
      {
        name: '2 to 3 weeks',
        y: 19,
        color: Highcharts.Color(colorService.orange.normal).brighten(0.20).get()
      },
      {
        name: '1 to 3 months',
        y: 22,
        color: colorService.grey.normal
      },
      {
        name: '4 months and up',
        y: 27,
        color: Highcharts.Color(colorService.grey.normal).brighten(0.15).get()
      }
    ];


    $scope.dataChart5 = {
      columns: [
        {
          type: 'column',
          name: 'Free',
          color: colorService.grey.normal,
          data: [10, 25, 101, 30, 4, 60, 45, 80, 150, 208, 350, 42]
        },
        {
          type: 'column',
          name: 'Payed',
          color: colorService.pink.normal,
          data: [8, 20, 92, 10, 9, 68, 14, 17, 98, 104, 208, 31]
        }
      ],
      lines: [
        {
          type: 'spline',
          name: 'Total Nb of Subscriptions',
          color: colorService.pink.normal,
          data: [100, 135, 136, 166, 170, 230, 275, 155, 405, 513, 863, 1005]
        }
      ]
    };


    $scope.dataChart6 = [
      {
        name: 'Free',
        color: colorService.grey.normal,
        data: [5, 3, 4, 7, 2, 14, 3, 4, 7, 2, 18, 25]
      },
      {
        name: 'Pro',
        color: colorService.green.normal,
        data: [2, 2, 3, 2, 1, 6, 2, 9, 2, 1, 10, 12]
      },
      {
        name: 'Business',
        color: Highcharts.Color(colorService.green.normal).brighten(0.10).get(),
        data: [3, 4, 4, 2, 5, 2, 4, 14, 2, 5, 7, 8]
      }
    ];
  }
);