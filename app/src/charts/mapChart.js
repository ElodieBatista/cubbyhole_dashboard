'use strict';

var module = angular.module('dashboardApp');

module.directive('mapChart', function(colorService) {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      data: '='
    },

    link: function (scope, element, attrs) {
      var data = [
        {
          name: 'africa',
          value: 10
        },
        {
          name: 'asia',
          value: 172
        },
        {
          name: 'australia',
          value: 517
        },
        {
          name: 'europe',
          value: 824
        },
        {
          name: 'north_america',
          value: 950
        },
        {
          name: 'south_america',
          value: 23
        }
      ];

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


      var max = 0,
          sum = 0;
      for (var i = 0, l = data.length; i < l; i++) {
        if (data[i].value > max) {
          max = data[i].value;
        }
        sum += data[i].value;
      }

      var areas = [],
          images = [];
      for (var j = 0, le = data.length; j < le; j++) {
        var percent = ((data[j].value * 100) / max) / 100;
        console.log(percent);
        areas.push({
          id: data[j].name,
          value: data[j].value,
          outlineColor: colorService.grey.normal,
          outlineAlpha: 1,
          color: 'rgba(0, 0, 0, ' + percent + ')'
        });
        data[j].percent = Math.round((data[j].value * 100) / sum);
        data[j].scale = data[j].percent / 10;

        if (data[j].scale < 1) {
          data[j].scale = 1;
        }

        images.push({
          latitude: coordinates[j].latitude,
          longitude: coordinates[j].longitude,
          type: 'circle',
          color:'#EC7C00',
          scale: data[j].scale.toString(),
          label: data[j].percent + '%',
          labelColor: (data[j].percent <= 10 ? '#EC7C00' : '#FFFFFF')
        });
      }

      var map = AmCharts.makeChart('location-map', {
        type: 'map',
        theme: 'customChalk',
        pathToImages: '/src/lib/ammap/images/',

        dataProvider: {
          map: 'continentsLow',
          zoomLevel: 1,
          areas: areas,
          images:images
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
    }
  };
});