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
  function PlansCtrl($scope, colorService, apiService) {
    apiService.PlansUsage.get(function(res) {
      $scope.plansUsage = res.data;

      // TEMP: fake data
      /*$scope.plansUsage = [
        {
          name: 'Free',
          isFree: true,
          isMostExpensive: false,
          storageUsage: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9],
          sharedQuotaUsage: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
        },
        {
          name: 'Pro',
          isFree: false,
          isMostExpensive: false,
          storageUsage: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2],
          sharedQuotaUsage: [0, 3, 7, 11, 17, 22, 24, 24, 20, 14, 8, 2]
        },
        {
          name: 'Business',
          isFree: false,
          isMostExpensive: true,
          storageUsage: [9, 2, 7, 5, 19, 12, 17, 6, 14, 10, 6, 8],
          sharedQuotaUsage: [12, 28, 35, 54, 39, 19, 127, 24, 4, 100, 86, 42]
        }
      ];*/

      $scope.setDataCharts();
    });


    $scope.setDataCharts = function() {
      $scope.dataChart1 = [];
      $scope.dataChart3 = [];
      $scope.dataChart4 = [];
      $scope.dataChart5 = [];

      for (var i = 0, l = $scope.plansUsage.length; i < l; i++) {
        $scope.dataChart1.push({
          name: $scope.plansUsage[i].name,
          color: $scope.plansUsage[i].isFree === true ?
            Highcharts.Color(colorService.grey.normal).brighten(i * 0.10).get() : Highcharts.Color(colorService.blue.normal).brighten(i * 0.10).get(),
          data: $scope.plansUsage[i].storageUsage
        });

        $scope.dataChart3.push({
          name: $scope.plansUsage[i].name,
          color: $scope.plansUsage[i].isFree === true ?
            Highcharts.Color(colorService.grey.normal).brighten(i * 0.10).get() : Highcharts.Color(colorService.orange.normal).brighten(i * 0.10).get(),
          data: $scope.plansUsage[i].sharedQuotaUsage
        });

        if ($scope.plansUsage[i].isMostExpensive) {
          $scope.mostExpPlan = $scope.plansUsage[i];
          $scope.mostExpPlan.globalUsage = Math.round(($scope.plansUsage[i].storageUsage[11] + $scope.plansUsage[i].sharedQuotaUsage[11]) / 3);

          $scope.dataChart4 = [
            {
              name: 'Storage',
              color: colorService.blue.normal,
              data: $scope.plansUsage[i].storageUsage
            },
            {
              name: 'Shared Quota',
              color: colorService.black.normal,
              data: $scope.plansUsage[i].sharedQuotaUsage
            }
          ]
        }

        $scope.dataChart5.push({
          name: $scope.plansUsage[i].name,
          value: Math.round(($scope.plansUsage[i].storageUsage[11] + $scope.plansUsage[i].sharedQuotaUsage[11]) / 3)
        });
      }
    }
  }
);