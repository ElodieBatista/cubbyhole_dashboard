'use strict';

var module = angular.module('dashboardApp');

module.directive('columnLineChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      var data = [];

      for (var prop in scope.data.lines) {
        data.push(scope.data.lines[prop]);
      }

      for (var prop in scope.data.columns) {
        data.push(scope.data.columns[prop]);
      }

      $(element).highcharts({
        chart: {},
        title: {
          text: scope.title
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        series: data
      });
    }
  };
});