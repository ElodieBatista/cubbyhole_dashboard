'use strict';

var module = angular.module('dashboardApp');

module.directive('donutChart', function() {
  return {
    restrict: 'E',
    scope: {
      titleChart: '=',
      serie1Name: '=',
      serie2Name: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      scope.$watch('data', function(newValue, oldValue) {
        if (scope.data) {
          scope.draw();
        }
      });

      scope.formatData = function() {
        var serie1Data = [];
        var serie2Data = [];

        for (var i = 0; i < scope.data.length; i++) {
          // add plans data
          serie1Data.push({
            name: scope.data[i].name,
            y: scope.data[i].y,
            color: scope.data[i].color
          });

          // add version data
          for (var j = 0; j < scope.data[i].drilldown.data.length; j++) {
            var brightness = 0.15 - (j / scope.data[i].drilldown.data.length) / 5 ;
            serie2Data.push({
              name: scope.data[i].drilldown.categories[j],
              y: scope.data[i].drilldown.data[j],
              color: Highcharts.Color(scope.data[i].color).brighten(brightness).get()
            });
          }
        }

        return {serie1Data: serie1Data, serie2Data: serie2Data};
      };

      scope.draw = function() {
        var seriesData = scope.formatData();

        $(element).highcharts({
          chart: {
            type: 'pie'
          },
          title: {
            text: scope.titleChart,
            style: {
              fontVariant: 'small-caps',
              fontSize: '18px'
            }
          },
          plotOptions: {
            pie: {
              shadow: false,
              center: ['50%', '50%']
            }
          },
          tooltip: {
            valueSuffix: ' users'
          },
          series: [
            {
              name: scope.serie1Name,
              data: seriesData.serie1Data,
              size: '60%',
              dataLabels: {
                formatter: function () {
                  return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
              }
            },
            {
              name: scope.serie2Name,
              data: seriesData.serie2Data,
              size: '80%',
              innerSize: '60%',
              dataLabels: {
                formatter: function () {
                  // display only if larger than 1
                  return this.y > 1 ? this.point.name + ':<br /> ' + this.y : null;
                },
                distance: 10
              }
            }
          ]
        });
      };
    }
  };
});