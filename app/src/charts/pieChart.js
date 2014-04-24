'use strict';

var module = angular.module('dashboardApp');

module.directive('pieChart', function() {
  return {
    restrict: 'E',
    scope: {
      titleChart: '=',
      subtitle: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      scope.$watch('data', function(newValue, oldValue) {
        if (scope.data) {
          scope.draw();
        }
      });

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

      scope.formatData = function() {
        return scope.data;
      };

      scope.draw = function() {
        $(element).highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          title: {
            text: scope.titleChart,
            style: {
              fontVariant: 'small-caps',
              fontSize: '18px'
            }
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: dataLabels,
              showInLegend: attrs.legend
            }
          },
          series: [
            {
              type: 'pie',
              name: scope.subtitle,
              data: scope.formatData()
            }
          ]
        });
      };
    }
  };
});