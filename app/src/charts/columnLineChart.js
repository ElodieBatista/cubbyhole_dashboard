'use strict';

var module = angular.module('dashboardApp');

module.directive('columnLineChart', function() {
  return {
    restrict: 'E',
    scope: {
      titleChart: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      scope.$watch('data', function(newValue, oldValue) {
        if (scope.data) {
          scope.draw();
        }
      });

      scope.formatData = function() {
        var data = [];

        for (var prop in scope.data.lines) {
          data.push(scope.data.lines[prop]);
        }

        for (var prop in scope.data.columns) {
          data.push(scope.data.columns[prop]);
        }

        return data;
      };

      scope.draw = function() {
        $(element).highcharts({
          chart: {},
          title: {
            text: scope.titleChart,
            margin: 30,
            style: {
              fontVariant: 'small-caps',
              fontSize: '18px'
            }
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
          series: scope.formatData()
        });
      };
    }
  };
});