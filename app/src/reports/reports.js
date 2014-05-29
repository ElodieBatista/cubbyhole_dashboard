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
    $scope.reports = {
      count: 0
    };

    apiService.Plans.get(function(res) {
      $scope.plans = res.data;
      $scope.plans.push({
        name: 'All Free',
        _id: 'all free'
      });
      $scope.plans.push({
        name: 'All Paying',
        _id: 'all paying'
      });
    });

    apiService.Years.get(function(res) {
      $scope.times = res.data;
    });

    apiService.Locations.get(function(res) {
      $scope.locations = res.data;
    });

    /*$scope.fakeAllusersFree2014 = [10, 35, 136, 166, 170, 230, 275, 355, 505, 713, 1063, 1095];
    $scope.fakeAllusersEuropePerPlan = [
      {
        name: 'Free',
        value: 25
      },
      {
        name: 'Pro',
        value: 48
      },
      {
        name: 'Business',
        value: 52
      },
      {
        name: 'Enterprise',
        value: 61
      }
    ];
    $scope.fakeAllusers2014PerLocation = [
      {
        name: 'Users',
        data: [10, 35, 136, 166, 170, 230]
      }
    ];*/

    $scope.createReport = function(form) {
      console.log(form);

      apiService.Reports.get({metric1: form.metrics.metric1, metric2: form.metrics.metric2, metric3: form.metrics.metric3}, function(res) {
        $scope.createChart(form.charttype, form.title, form.color, form.id, res.data);
      });


      /*if (form.charttype === 'line') {
        $scope.createChart(form.charttype, form.title, form.color, form.id, $scope.fakeAllusersFree2014);
      } else if (form.charttype === 'pie') {
        $scope.createChart(form.charttype, form.title, form.color, form.id, $scope.fakeAllusersEuropePerPlan);
      } else if (form.charttype === 'column') {
        $scope.createChart(form.charttype, form.title, form.color, form.id, {categories: $scope.locations, series: $scope.fakeAllusers2014PerLocation});
      }*/
    };
  }
);