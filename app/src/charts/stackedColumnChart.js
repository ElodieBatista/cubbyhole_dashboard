'use strict';

var module = angular.module('dashboardApp');

module.directive('stackedColumnChart', function() {
  return {
    restrict: 'E',
    scope: {
      titleChart: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
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