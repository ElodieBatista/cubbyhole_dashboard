'use strict';

var module = angular.module('dashboardApp');

module.directive('columnChart', function() {
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
        var series = scope.formatData();
        $(element).highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: scope.titleChart,
            margin: 30,
            style: {
              fontVariant: 'small-caps',
              fontSize: '18px'
            }
          },
          xAxis: {
            categories: series.categories
          },
          yAxis: {
            min: 0,
            title: {
              text: ''
            }
          },
          series: series.series
        });
      };
    }
  };
});