'use strict';

var module = angular.module('dashboardApp');

module.factory('chartService', function() {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return {
    getMonths: function() {
      var monthIndex = new Date().getMonth();
      return (months.slice(monthIndex + 1)).concat(months.slice(0, monthIndex + 1));
    }
  };
});