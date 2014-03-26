'use strict';

var module = angular.module('dashboardApp');

module.factory('colorService', function() {
  return {
    red: {
      normal: 'rgb(255, 29, 37)',
      light: '',
      dark: ''
    },
    blue: {
      normal: 'rgb(63, 169, 245)',
      light: '',
      dark: ''
    },
    orange: {
      normal: 'rgb(255, 147, 30)',
      light: '',
      dark: ''
    },
    green: {
      normal: 'rgb(122, 201, 67)',
      light: '',
      dark: ''
    },
    pink: {
      normal: 'rgb(255, 149, 189)',
      light: '',
      dark: ''
    },
    grey: {
      normal: 'rgb(180, 180, 180)',
      light: 'rgb(210, 210, 210)',
      dark: ''
    }
  };
});