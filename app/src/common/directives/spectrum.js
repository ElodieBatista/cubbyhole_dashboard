'use strict';

var module = angular.module('dashboardApp');

/**
 * Defines the way to display a color picker
 */
module.directive('spectrum', function(colorService) {
  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      $("#spectrum").spectrum({
        showInput: true,
        showPaletteOnly: true,
        showPalette: true,
        color: colorService.green.normal,
        palette: [
          [colorService.red.normal, colorService.blue.normal, colorService.orange.normal,
            colorService.green.normal, colorService.pink.normal]
        ],
        change: function(color) {
          $(this).val(color);
        }
      });
    }
  };
});