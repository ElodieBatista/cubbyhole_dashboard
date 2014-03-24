'use strict';

var module = angular.module('dashboardApp');

/**
 * Defines the way to display a modal
 */
module.directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      modalOpts: '=modalOpts',
      modalform: '=modalform',
      modalColor: '=modalColor'
    },
    templateUrl: '/src/common/modal/modal.tpl.html',

    link: function(scope, elem, attrs) {
      scope.submitBtnClass = scope.modalColor + '-btn';

      $(elem).on('shown.bs.modal', function(e) {
        $(this).find('input:not([type="file"]):not([type="submit"]):first').focus();
      });

      $(elem).on('hide.bs.modal', function(e) {
        $(this).find('.input-text-empty-onclose').val('');
      });

      scope.dismissModal = function() {
        $('.modal').modal('hide');
      };
    }
  };
});