'use strict';

var module = angular.module('dashboardApp');

module.directive('reportExplorer', function(colorService, $compile) {
  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      scope.toggleItem = function(item) {
        if (scope.itemActive === item) {
          scope.itemActive = null;
        } else {
          scope.itemActive = item;
        }
      };

      scope.itemActive = null;
      var freePlace = false;

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
          submitFn: scope.reGenerateReport,
          plans: scope.plans,
          locations: scope.locations,
          times: scope.times,
          isRadioDisabled: scope.isRadioDisabled,
          templateUrl: 'src/reports/tpls/newReport.tpl.html'
        };
        $('#appmodal').modal('show');
      };

      scope.reGenerateReport = function(form) {
        form.id = 'chart' + Date.now();
        scope.reSaveFormReport(form);
        scope.createReport(form);
      };

      scope.reOpenModalDeleteReport = function(report) {
        scope.modalOpts = {
          title: 'Delete report ' + report.name,
          submitBtnVal: 'Delete',
          submitFn: scope.deleteReport,
          submitFnExtraParam: report.id === undefined ? report[0].id : report.id,
          templateUrl: 'src/reports/tpls/deleteReport.tpl.html'
        };
        $('#appmodal').modal('show');
      };

      scope.isRadioDisabled = function(radioVal, metricIndex) {
        return radioVal === scope.modalform.metrics['metric' + metricIndex].prop;
      };

      scope.createChart = function(type, title, color, id, data) {
        var html = '';

        if (scope.reports.count % 2 === 0 && !freePlace) {
          $('#reports-container').append($compile('<div class="row space-top-mini"><div id="' + id + '" class="col-md-6"><input type="checkbox" class="chart-btn" ng-checked="{true:\'itemActive\',false:\'\'}[itemActive === reports[\'' + id + '\']]" ng-click="toggleItem(reports[\'' + id + '\'])"></div></div>')(scope));
        } else {
          $('#reports-container .row:last-of-type').append($compile('<div id="' + id + '" class="col-md-6"><input type="checkbox" class="chart-btn" ng-checked="{true:\'itemActive\',false:\'\'}[itemActive === reports[\'' + id + '\']]" ng-click="toggleItem(reports[\'' + id + '\'])"></div>')(scope));
        }


        if (type === 'line') {
          scope.reports[id] = [{
            id: id,
            name: title,
            type: type,
            color: Highcharts.Color(color).get(),
            data: data
          }];
          html = '<line-chart class="chart-directive chart clear" title-chart="\'' + title + '\'" data="reports[\'' + id + '\']" style="border-top: 3px solid ' + color + '"></line-chart>';
        } else if (type === 'pie') {
          var dataToSave = [];
          for (var i = 0, l = data.length; i < l; i++) {
            dataToSave.push({
              name: data[i].name,
              type: type,
              y: data[i].value,
              color: Highcharts.Color(color).brighten(i * (0.15/l)).get()
            });
          }
          dataToSave.id = id;
          dataToSave.name = title;
          scope.reports[id] = dataToSave;

          html = '<pie-chart class="chart-directive chart clear" title-chart="\'' + title + '\'" subtitle="\'' + title + '\'" data="reports[\'' + id + '\']" style="border-top: 3px solid ' + color + '"></pie-chart>';
        } else if (type === 'column') {
          data.series[0].color = color;
          data.id = id;
          data.name = title;
          data.type = type;
          scope.reports[id] = data;

          html = '<column-chart class="chart-directive chart clear" title-chart="\'' + title + '\'" data="reports[\'' + id + '\']" style="border-top: 3px solid ' + color + '"></column-chart>';
        }

        var chart = $compile(html)(scope);
        $('#reports-container .row:last-of-type .col-md-6:last-of-type').append(chart);
        setTimeout(function() {
          $(window).trigger('resize');
        }, 1000);
        scope.reports.count++;
      };

      scope.deleteReport = function(form, id) {
        delete scope.reports[id];
        scope.toggleItem(null);

        if ($('#' + id).siblings().length === 0) {
          $('#' + id).parent().remove();
        } else {
          $('#' + id).remove();
          freePlace = true;
        }

        scope.reports.count--;

        var forms = JSON.parse(localStorage.formReports);

        if (forms.length > 1) {
          var idToDelete;
          for (var i = 0, l = forms.length; i < l; i++) {
            if (forms[i] !== null && forms[i].id === id) {
              idToDelete = i;
              break;
            }
          }
          delete forms[idToDelete];
          localStorage.formReports = JSON.stringify(forms);
        } else {
          localStorage.formReports = '';
        }
      };

      scope.reDrawReports = function() {
        if (localStorage.getItem('formReports') !== '' && localStorage.getItem('formReports') !== null) {
          var forms = JSON.parse(localStorage.getItem('formReports'));

          for (var i = 0, l = forms.length; i < l; i++) {
            if (forms[i] !== null) {
              scope.createReport(forms[i]);
            }
          }
        }
      };

      scope.reSaveFormReport = function(form) {
        var forms;

        if (localStorage.getItem('formReports') === '' || localStorage.getItem('formReports') === null) {
          forms = [];
        } else {
          forms = JSON.parse(localStorage.getItem('formReports'));
        }

        forms.push(form);

        localStorage.formReports = JSON.stringify(forms);
      };

      scope.reDrawReports();
    }
  };
});