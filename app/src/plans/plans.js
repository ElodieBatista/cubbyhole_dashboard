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