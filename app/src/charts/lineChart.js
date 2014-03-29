'use strict';

var module = angular.module('dashboardApp');

module.directive('lineChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      $(element).highcharts({
        chart: {},
        title: {
          text: scope.title,
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