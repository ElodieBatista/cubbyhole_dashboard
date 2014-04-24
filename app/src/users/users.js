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

    apiService.NewUsers.get(function(res) {
      $scope.newUsers = res.data;

      if ($scope.isDataChart1Ready()) {
        $scope.setDataChart1();
      }
    });

    apiService.TotalUsers.get(function(res) {
      $scope.users = res.data;

      if ($scope.isDataChart1Ready()) {
        $scope.setDataChart1();
      }

      $scope.nbUsers = $scope.users[11];
    });


    // #2 & #5
    var usersPerPlan = [
      {
        name: 'Free',
        users: 651,
        plans: [
          {
            name: 'Free',
            users: 651
          }
        ]
      },
      {
        name: 'Paying',
        users: 344,
        plans: [
          {
            name: 'Pro',
            users: 201
          },
          {
            name: 'Business',
            users: 143
          }
        ]
      }
    ];

    // #3
    var delay = [
      {
        name: 'Directly',
        value: 25
      },
      {
        name: '1 wk',
        value: 48
      },
      {
        name: '2-3 wks',
        value: 52
      },
      {
        name: '1-3 mos',
        value: 61
      },
      {
        name: '4+ mos',
        value: 158
      }
    ];

    // #4
    var newFreeUsers = [9, 20, 81, 30, 4, 60, 45, 80, 150, 208, 350, 42];
    var newPayingUsers = [1, 15, 20, 10, 9, 68, 14, 17, 98, 104, 208, 31];
    var nbSubscriptions = [100, 135, 136, 166, 170, 230, 275, 155, 405, 513, 763, 1005];

    // #6
    var plansRepartition = [
      {
        name: 'Free',
        isFree: true,
        data: [9, 20, 4, 7, 2, 14, 3, 4, 7, 2, 18, 25]
      },
      {
        name: 'Pro',
        isFree: false,
        data: [1, 12, 3, 2, 1, 6, 2, 9, 2, 1, 10, 12]
      },
      {
        name: 'Business',
        isFree: false,
        data: [0, 3, 4, 2, 5, 2, 4, 14, 2, 5, 7, 8]
      }
    ];


    $scope.newUsersToday = 85;
    $scope.subscriptionsToday = 40;
    $scope.payingUsersToday = 12;



    var sum = [], categories = [], values = [];
    for (var i = 0, l = usersPerPlan.length; i < l; i++) {
      sum[i] = 0;
      categories[i] = [];
      values[i] = [];
      for (var j = 0, le = usersPerPlan[i].plans.length; j < le; j++) {
        sum[i] += usersPerPlan[i].plans[j].users;
        categories[i].push(usersPerPlan[i].plans[j].name);
        values[i].push(usersPerPlan[i].plans[j].users);
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


    $scope.dataChart3 = [
      {
        name: delay[0].name,
        y: delay[0].value,
        color: colorService.red.normal,
        sliced: true,
        selected: true
      },
      {
        name: delay[1].name,
        y: delay[1].value,
        color: Highcharts.Color(colorService.red.normal).brighten(0.10).get()
      },
      {
        name: delay[2].name,
        y: delay[2].value,
        color: Highcharts.Color(colorService.red.normal).brighten(0.20).get()
      },
      {
        name: delay[3].name,
        y: delay[3].value,
        color: colorService.grey.normal
      },
      {
        name: delay[4].name,
        y: delay[4].value,
        color: Highcharts.Color(colorService.grey.normal).brighten(0.15).get()
      }
    ];


    $scope.dataChart4 = {
      columns: [
        {
          type: 'column',
          name: 'Free',
          color: colorService.black.normal,
          data: newFreeUsers
        },
        {
          type: 'column',
          name: 'Paying',
          color: colorService.blue.normal,
          data: newPayingUsers
        }
      ],
      lines: [
        {
          type: 'spline',
          name: 'Total Nb of Subscriptions',
          color: colorService.blue.normal,
          data: nbSubscriptions
        }
      ]
    };


    $scope.dataChart5 = [
      {
        name: usersPerPlan[0].name,
        y: usersPerPlan[0].users,
        color: Highcharts.Color(colorService.grey.normal).brighten(0.10).get()
      },
      {
        name: usersPerPlan[1].name,
        y: usersPerPlan[1].users,
        color: colorService.red.normal,
        sliced: true,
        selected: true
      }
    ];


    $scope.dataChart6 = [];
    for (var k = 0, len = plansRepartition.length; k < len; k++) {
      $scope.dataChart6.push({
        name: plansRepartition[k].name,
        color: plansRepartition[k].isFree === true ?
          Highcharts.Color(colorService.grey.normal).brighten(k * 0.10).get() : Highcharts.Color(colorService.blue.normal).brighten(k * 0.10).get(),
        data: plansRepartition[k].data
      });
    }
  }
);