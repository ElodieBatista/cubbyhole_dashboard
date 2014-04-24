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
          charttype: 'line',
          color: colorService.green.normal
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

      scope.createChart = function(type, title, color, data) {
        var html = '';

        if (count % 2 === 0) {
          $('#reports-container').append('<div class="row space-top-mini"><div class="col-md-6"></div></div>');
        } else {
          $('#reports-container .row:last-of-type').append('<div class="col-md-6"></div>');
        }


        if (type === 'line') {
          scope.dataCharts.push([{
            name: title,
            color: Highcharts.Color(color).get(),
            data: data
          }]);
          html = '<line-chart class="chart-directive chart" title-chart="\'' + title + '\'" data="dataCharts[' + count + ']" style="border-top: 3px solid ' + color + '"></line-chart>';
        } else if (type === 'pie') {
          var dataToSave = [];
          for (var i = 0, l = data.length; i < l; i++) {
            dataToSave.push({
              name: data[i].name,
              y: data[i].value,
              color: Highcharts.Color(color).brighten(i * (0.15/l)).get()
            });
          }
          scope.dataCharts.push(dataToSave);

          html = '<pie-chart class="chart-directive chart" title-chart="\'' + title + '\'" subtitle="\'' + scope.modalform.metrics.metric1.prop + '\'" data="dataCharts[' + count + ']" style="border-top: 3px solid ' + color + '"></pie-chart>';
        } else if (type === 'column') {
          data.series[0].color = color;
          scope.dataCharts.push(data);

          html = '<column-chart class="chart-directive chart" title-chart="\'' + title + '\'" data="dataCharts[' + count + ']" style="border-top: 3px solid ' + color + '"></column-chart>';
        }

        var chart = $compile(html)(scope);
        $('#reports-container .row:last-of-type .col-md-6:last-of-type').append(chart);
        $(window).trigger('resize');
        count++;
      };
    }
  };
});