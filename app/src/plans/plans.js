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
  function PlansCtrl($scope) {
    var colors = Highcharts.getOptions().colors;
    $scope.data = [
        {
          name: 'Free',
          y: 60,
          color: colors[0],
          drilldown: {
            name: 'Free',
            categories: ['Free 1', 'Free 2'],
            data: [25, 35],
            color: colors[0]
          }
        },
        {
          name: 'Payed',
          y: 40,
          color: colors[1],
          drilldown: {
            name: 'Payed',
            categories: ['Pro', 'Business', 'Enterprise'],
            data: [10, 15, 15],
            color: colors[1]
          }
        }
      ];
  }
);