'use strict';

var module = angular.module('dashboardApp');

module.directive('reportExplorer', function() {
  return {
    restrict: 'A',
    scope: '{}',

    link: function (scope, element, attrs) {
      scope.reOpenModalNewReport = function() {
        scope.modalform = {
          metric1: {
            prop: 'users',
            filter: 'all'
          },
          metric2: {
            prop: 'plan'
          },
          metric3: {
            prop: 'time'
          },
          charttype: 'line'
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
        return index === scope.modalform.metric1.prop;
      };

      scope.radioSecond = function(index) {
        return index === scope.modalform.metric2.prop;
      };

      scope.radioThird = function(index) {
        return index === scope.modalform.metric3.prop;
      };
    }
  };
});