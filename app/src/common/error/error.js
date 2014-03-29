'use strict';

var module = angular.module('dashboardApp');

/**
 * Displays a modal with an error msg corresponding to the route and the status
 */
module.directive('error', function(apiService) {
  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      var errors = {
        custom: {
          0: 'Impossible to upload these items: '
        },
        500: 'Something went wrong. Please, try again later.',
        400: 'The request is not recognized. Please, try again later.'
      };


      scope.errorShow = function(error) {
        $('#appmodal').modal('hide');

        var errorText = '';

        if (error.custom !== undefined) {
          errorText = errors.custom[error.custom] + error.param;
        } else {
          console.log(error.config.url + ' ' + error.status);

          error.config.url = error.config.url.replace('//', '');

          var route;

          if (error.status === 500) {
            errorText = errors['500'];
          } else if (error.status === 400) {
            errorText = errors['400'];
          } else {
            var pos1 = error.config.url.indexOf('/');
            var pos2 = error.config.url.indexOf('/', pos1 + 1);

            if (pos2 === -1) {
              route = error.config.url.substring(pos1 + 1);
            } else {
              route = error.config.url.substring(pos1 + 1, pos2);
            }
            route = route.charAt(0).toUpperCase() + route.slice(1);
            errorText = apiService[route + 'Error'][error.config.method][error.status];
          }
        }


        scope.modalOpts = {
          title: 'Error',
          submitBtnVal: 'Ok',
          errorText: errorText,
          templateUrl: 'src/common/error/error.tpl.html'
        };

        $('#errormodal #appmodal').modal('show');
      };
    }
  };
});