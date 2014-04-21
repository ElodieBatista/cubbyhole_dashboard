'use strict';

var module = angular.module('dashboardApp');

/**
 * Defines the way to display a color picker
 */
module.directive('spectrum', function() {
  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      $("#spectrum").spectrum({
        showPaletteOnly: true,
        showPalette: true,
        color: 'blanchedalmond',
        palette: [
          ['black', 'white', 'blanchedalmond',
            'rgb(255, 128, 0);', 'hsv 100 70 50'],
          ['red', 'yellow', 'green', 'blue', 'violet']
        ]
      });
    }
  };
});