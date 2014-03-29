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
      attrs.legend === 'true' ? attrs.legend = true : attrs.legend = false;

      var dataLabels = {
        enabled: true,
        color: '#000000',
        connectorColor: '#000000',
        distance: 22,
        format: '{point.name}: <br />{point.percentage:.1f} %'
      };

      if (attrs.legend) {
        dataLabels = {
          enabled: false
        };
      }


      $(element).highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: scope.title,
          style: {
            fontVariant: 'small-caps',
            fontSize: '18px'
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: dataLabels,
            showInLegend: attrs.legend
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