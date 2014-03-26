'use strict';

var module = angular.module('dashboardApp');

module.directive('stackedColumnChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      $(element).highcharts({
        chart: {
          type: 'column'
        },
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
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'percent'
          }
        },
        series: scope.data
      });
    }
  };
});