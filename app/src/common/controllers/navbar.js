'use strict';

var module = angular.module('dashboardApp');

module.controller('NavbarCtrl',
  function NavbarCtrl(conf, $rootScope, $scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }
);