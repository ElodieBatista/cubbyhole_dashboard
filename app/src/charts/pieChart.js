'use strict';

var module = angular.module('dashboardApp');

module.directive('pieChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      $(element).highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: scope.title
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#000000',
              connectorColor: '#000000',
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: scope.data
        }]
      });
    }
  };
});