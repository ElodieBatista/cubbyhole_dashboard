'use strict';

var module = angular.module('dashboardApp');

module.directive('gaugeChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      var data = [{
        name: 'Usage',
        data: [scope.data],
        tooltip: {
          valueSuffix: ' %'
        }
      }];


      $(element).highcharts({
        chart: {
          type: 'gauge'
        },
        title: {
          text: scope.title,
          style: {
            fontVariant: 'small-caps',
            fontSize: '18px'
          }
        },
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
            backgroundColor: '#FFF'
          }]
        },
        yAxis: {
          min: 0,
          max: 100,

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: 'transparent',

          tickPixelInterval: 30,
          tickWidth: 1,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#000',

          labels: {
            step: 2,
            rotation: 'auto'
          },
          title: {
            text: ''
          },
          plotBands: [{
            from: 0,
            to: 30,
            color: colorService.green.normal
          }, {
            from: 30,
            to: 70,
            color: colorService.orange.normal
          }, {
            from: 70,
            to: 100,
            color: colorService.red.normal
          }]
        },

        series: data
      });
    }
  };
});