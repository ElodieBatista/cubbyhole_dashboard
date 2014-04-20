'use strict';

var module = angular.module('dashboardApp');

module.directive('reportExplorer', function() {
  return {
    restrict: 'A',
    scope: '{}',

    link: function (scope, element, attrs) {
      scope.reOpenModalNewReport = function() {
        scope.modalform = {
          radiofirst: '0',
          radiosecond: '0',
          radiothird: '1'
        };

        scope.modalOpts = {
          title: 'Create a report',
          submitBtnVal: 'Create',
          submitFn: scope.createReport,
          plans: scope.plans,
          locations: scope.locations,
          times: scope.times,
          radioFirst: scope.radioFirst,
          radioSecond: scope.radioSecond,
          radioThird: scope.radioThird,
          templateUrl: 'src/reports/tpls/newReport.tpl.html'
        };
        $('#appmodal').modal('show');
      };

      scope.radioFirst = function(index) {
        return index === scope.modalform.radiofirst;
      };

      scope.radioSecond = function(index) {
        return index === scope.modalform.radiosecond;
      };

      scope.radioThird = function(index) {
        return index === scope.modalform.radiothird;
      };
    }
  };
});