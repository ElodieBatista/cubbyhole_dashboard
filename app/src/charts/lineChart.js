'use strict';

var module = angular.module('dashboardApp');

module.directive('lineChart', function(chartService) {
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
        return scope.data;
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
          tooltip: {
            valueSuffix: scope.suffix ? '%' : ''
          },
          xAxis: {
            categories: chartService.getMonths()
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