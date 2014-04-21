'use strict';

var module = angular.module('dashboardApp');

module.directive('reportExplorer', function(colorService, $compile) {
  return {
    restrict: 'A',
    scope: '{}',

    link: function (scope, element, attrs) {
      var count = 0;
      scope.dataCharts = [];

      scope.reOpenModalNewReport = function() {
        scope.modalform = {
          metrics: {
            metric1: {
              prop: 'users',
              filter: 'all'
            },
            metric2: {
              prop: 'plan'
            },
            metric3: {
              prop: 'time'
            }
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
        return index === scope.modalform.metrics.metric1.prop;
      };

      scope.radioSecond = function(index) {
        return index === scope.modalform.metrics.metric2.prop;
      };

      scope.radioThird = function(index) {
        return index === scope.modalform.metrics.metric3.prop;
      };

      scope.createChart = function(type, data) {
        var html = '';

        if (count % 2 === 0) {
          $('#reports-container').append('<div class="row"><div class="col-md-6"></div></div>');
        } else {
          $('#reports-container .row:last-of-type').append('<div class="col-md-6"></div>');
        }

        if (type === 'line') {
          scope.dataCharts.push([{
            name: 'test',
            color: Highcharts.Color(colorService.blue.normal).get(),
            data: data
          }]);
          html = '<line-chart id="test2" class="chart-directive chart chart-border-blue" title-chart="\'test\'" data="dataCharts[' + count + ']"></line-chart>';
        }

        var chart = $compile(html)(scope);
        $('#reports-container .row:last-of-type .col-md-6:last-of-type').append(chart);
        $(window).trigger("resize");
        count++;
      };
    }
  };
});