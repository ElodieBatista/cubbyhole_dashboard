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
  function UsersCtrl($scope, apiService, colorService) {
    // #1
    $scope.isDataChart1Ready = function() {
      return $scope.newUsers && $scope.users;
    };

    $scope.setDataChart1 = function() {
      $scope.dataChart1 = {
        columns: [
          {
            type: 'column',
            name: 'New Users',
            color: colorService.red.normal,
            data: $scope.newUsers
          }
        ],
        lines: [
          {
            type: 'spline',
            name: 'Total Nb of Users',
            color: colorService.red.normal,
            data: $scope.users
          }
        ]
      };
    };

    apiService.UsersNew.get(function(res) {
      $scope.newUsers = res.data;

      if ($scope.isDataChart1Ready()) {
        $scope.setDataChart1();
      }
    });

    apiService.UsersTotal.get(function(res) {
      $scope.users = res.data;

      if ($scope.isDataChart1Ready()) {
        $scope.setDataChart1();
      }

      $scope.nbUsers = $scope.users[11];
    });


    // #2 & #5
    $scope.setDataChart2 = function() {
      var sum = [], categories = [], values = [];
      for (var i = 0, l = $scope.usersPerPlan.length; i < l; i++) {
        sum[i] = 0;
        categories[i] = [];
        values[i] = [];
        for (var j = 0, le = $scope.usersPerPlan[i].plans.length; j < le; j++) {
          sum[i] += $scope.usersPerPlan[i].plans[j].users;
          categories[i].push($scope.usersPerPlan[i].plans[j].name);
          values[i].push($scope.usersPerPlan[i].plans[j].users);
        }
      }

      $scope.dataChart2 = [
        {
          name: 'Free',
          y: sum[0],
          color: colorService.grey.normal,
          drilldown: {
            name: 'Free',
            categories: categories[0],
            data: values[0],
            color: colorService.grey.normal
          }
        },
        {
          name: 'Paying',
          y: sum[1],
          color: colorService.blue.normal,
          drilldown: {
            name: 'Paying',
            categories: categories[1],
            data: values[1],
            color: colorService.blue.normal
          }
        }
      ];
    };

    $scope.setDataChart5 = function() {
      $scope.dataChart5 = [
        {
          name: $scope.usersPerPlan[0].name,
          y: $scope.usersPerPlan[0].users + 10, // TEMP: raise values
          color: Highcharts.Color(colorService.grey.normal).brighten(0.10).get()
        },
        {
          name: $scope.usersPerPlan[1].name,
          y: $scope.usersPerPlan[1].users + 10, // TEMP: raise values
          color: colorService.red.normal,
          sliced: true,
          selected: true
        }
      ];
    };

    apiService.PlansUsers.get(function(res) {
      $scope.usersPerPlan = res.data;
      $scope.setDataChart2();
      $scope.setDataChart5();
    });

    // #3
    $scope.setDataChart3 = function() {
      $scope.dataChart3 = [
        {
          name: $scope.delays[0].name,
          y: $scope.delays[0].value + 5, // TEMP: raise value
          color: colorService.red.normal,
          sliced: true,
          selected: true
        },
        {
          name: $scope.delays[1].name,
          y: $scope.delays[1].value + 10, // TEMP: raise values
          color: Highcharts.Color(colorService.red.normal).brighten(0.10).get()
        },
        {
          name: $scope.delays[2].name,
          y: $scope.delays[2].value + 19, // TEMP: raise values
          color: Highcharts.Color(colorService.red.normal).brighten(0.20).get()
        },
        {
          name: $scope.delays[3].name,
          y: $scope.delays[3].value + 23, // TEMP: raise values
          color: colorService.grey.normal
        },
        {
          name: $scope.delays[4].name,
          y: $scope.delays[4].value + 2, // TEMP: raise values
          color: Highcharts.Color(colorService.grey.normal).brighten(0.15).get()
        }
      ];
    };

    apiService.UsersDelay.get(function(res) {
      $scope.delays = res.data;
      $scope.setDataChart3();
    });

    // #4
    $scope.nbSubscriptions = [100, 135, 136, 166, 170, 230, 275, 155, 405, 513, 763, 1005];
    $scope.isDataChart4Ready = function() {
      return $scope.newFreeUsers && $scope.newPayingUsers && $scope.nbSubscriptions;
    };

    $scope.setDataChart4 = function() {
      $scope.dataChart4 = {
        columns: [
          {
            type: 'column',
            name: 'Free',
            color: colorService.black.normal,
            data: $scope.newFreeUsers
          },
          {
            type: 'column',
            name: 'Paying',
            color: colorService.blue.normal,
            data: $scope.newPayingUsers
          }
        ],
        lines: [
          {
            type: 'spline',
            name: 'Total Nb of Subscriptions',
            color: colorService.blue.normal,
            data: $scope.nbSubscriptions
          }
        ]
      };
    };

    apiService.UsersNewFree.get(function(res) {
      $scope.newFreeUsers = res.data;

      // TEMP
      $scope.newFreeUsers[10] += 50;
      $scope.newFreeUsers[11] += 150;

      if ($scope.isDataChart4Ready()) {
        $scope.setDataChart4();
      }
    });

    apiService.UsersNewPaying.get(function(res) {
      $scope.newPayingUsers = res.data;

      // TEMP
      $scope.newPayingUsers[10] += 40;
      $scope.newPayingUsers[11] += 180;

      if ($scope.isDataChart4Ready()) {
        $scope.setDataChart4();
      }
    });

    // #6
    $scope.setDataChart6 = function() {
      $scope.dataChart6 = [];
      for (var k = 0, len = $scope.plansDistribution.length; k < len; k++) {
        $scope.dataChart6.push({
          name: $scope.plansDistribution[k].name,
          color: $scope.plansDistribution[k].isFree === true ?
            Highcharts.Color(colorService.grey.normal).brighten(k * 0.10).get() : Highcharts.Color(colorService.blue.normal).brighten(k * 0.10).get(),
          data: $scope.plansDistribution[k].data
        });
      }
    };

    apiService.PlansDistribution.get(function(res) {
      $scope.plansDistribution = res.data;

      // TEMP
      $scope.plansDistribution[2].data[10] += 10;
      $scope.plansDistribution[2].data[11] += 8;

      $scope.plansDistribution[3].data[10] += 6;
      $scope.plansDistribution[3].data[11] += 4;

      $scope.setDataChart6();
    });


    $scope.newUsersToday = 85;
    $scope.subscriptionsToday = 40;
    $scope.payingUsersToday = 12;
  }
);