'use strict';

var module = angular.module('dashboardApp');

module.directive('lineChart', function() {
  return {
    restrict: 'E',
    scope: {
      titleChart: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
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
          valueSuffix: '%'
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
        series: scope.data
      });
    }
  };
});