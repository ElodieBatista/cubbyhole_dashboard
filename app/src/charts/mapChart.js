'use strict';

var module = angular.module('dashboardApp');

module.directive('mapChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      color: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      var coordinates = [
        {
          name: 'africa',
          latitude:4.214943141390651,
          longitude:23.90625
        },
        {
          name: 'asia',
          latitude:52.90890204777028,
          longitude:93.515625
        },
        {
          name: 'australia',
          latitude:-25.48295117535531,
          longitude:135
        },
        {
          name: 'europe',
          latitude:50.736455137010665,
          longitude:24.2578125
        },
        {
          name: 'north_america',
          latitude:48.354467,
          longitude:-99.998123
        },
        {
          name: 'south_america',
          latitude:-16.299051014581817,
          longitude:-55.8984375
        }
      ];


      var max = 0, sum = 0;
      for (var i = 0, l = scope.data.length; i < l; i++) {
        if (scope.data[i].value > max) {
          max = scope.data[i].value;
        }
        sum += scope.data[i].value;
      }

      var areas = [],
          images = [];
      for (var j = 0, le = scope.data.length; j < le; j++) {
        areas.push({
          id: scope.data[j].name,
          value: scope.data[j].value,
          outlineColor: colorService.grey.normal,
          outlineAlpha: 1,
          color: 'rgba(0, 0, 0, ' + ((scope.data[j].value * 100) / max) / 100 + ')'
        });
        scope.data[j].percent = Math.round((scope.data[j].value * 100) / sum);
        scope.data[j].scale = scope.data[j].percent / 10;

        if (scope.data[j].scale < 1) {
          scope.data[j].scale = 1;
        }

        images.push({
          latitude: coordinates[j].latitude,
          longitude: coordinates[j].longitude,
          type: 'circle',
          color: scope.color,
          scale: scope.data[j].scale.toString(),
          label: scope.data[j].percent + '%',
          labelColor: (scope.data[j].percent <= 10 ? scope.color : colorService.white.normal)
        });
      }

      var map = AmCharts.makeChart('location-map', {
        type: 'map',
        theme: 'customChalk',
        pathToImages: '/src/lib/ammap/images/',
        mouseWheelZoomEnabled: true,

        dataProvider: {
          map: 'continentsLow',
          zoomLevel: 1,
          areas: areas,
          images: images
        },
        areasSettings: {
          autoZoom: false,
          balloonText: '[[title]]: [[value]] users'
        },
        valueLegend: {
          right: 10,
          minValue: '0',
          maxValue: max
        }
      });

      map.addLabel(0, 605, scope.title, 'center', '30', scope.color, 0, 1, false);
    }
  };
});