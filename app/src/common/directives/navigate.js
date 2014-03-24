'use strict';

var module = angular.module('dashboardApp');

/**
 * Handles navigation on HTML elements other than <a></a> & handles external urls
 */
module.directive('navigate', function($location, $window) {
  return {
    restrict: 'A',
    scope: {},

    link: function (scope, element, attrs) {
      element.on('click', function() {
        $location.$$search = {};

        if (attrs.navigate === 'external') {
          $window.location.href = attrs.navigateParamVal;
        } else {
          $location.search(attrs.navigateParam, attrs.navigateParamVal).path(attrs.navigate);
          if (!scope.$$phase) { scope.$apply(); }
        }
      });
    }
  };
});