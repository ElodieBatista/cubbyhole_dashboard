'use strict';

var module = angular.module('dashboardApp');

/**
 * Displays a modal with an error msg corresponding to the route and the status
 */
module.directive('error', function() {
  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      var errors = {
        custom: {
          0: 'Impossible to upload these items: '
        },

        500: 'Something went wrong. Please, try again later.',
        400: 'The request is not recognized. Please, try again later.',

        item: {
          GET: {
            403: 'You are not allowed to access this item.',
            404: 'This item doesn\'t exist.',
            405: 'You can\'t download this folder because it is empty.'
          },
          POST: {
            404: 'This item doesn\'t exist.',
            422: 'This item\'s parent doesn\'t exist.'
          },
          DELETE: {
            403: 'You are not allowed to delete this item.',
            404: 'This item doesn\'t exist.'
          },
          PUT: {
            401: 'You are not authorized to update this item.',
            404: 'This item doesn\'t exist.'
          }
        },

        share: {
          POST: {
            403: 'You are not allowed to access this item.',
            404: 'This item doesn\'t exist.',
            422: 'One or several of the members you entered are not Cubbyhole users.'
          },
          DELETE: {
            404: 'This item doesn\'t exist.'
          },
          PUT: {
            404: 'This item doesn\'t exist.'
          }
        },

        link: {
          POST: {
            403: 'You are not allowed to access this item.',
            404: 'This item doesn\'t exist.'
          },
          DELETE: {
            404: 'This item doesn\'t exist.'
          },
          PUT: {
            404: 'This item doesn\'t exist.'
          }
        },

        notification: {
          DELETE: {
            403: 'You are not allowed to delete this notification.',
            404: 'This notification doesn\'t exist.'
          }
        },

        user: {
          GET: {
            404: 'This user doesn\'t exist.'
          },
          PUT: {
            404: 'This user doesn\'t exist.'
          }
        },

        plan: {
          GET: {
            404: 'This plan doesn\'t exist.'
          },
          DELETE: {
            404: 'This plan doesn\'t exist.'
          }
        }
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

          if (error.status !== 500) {
            var pos1 = error.config.url.indexOf('/');
            var pos2 = error.config.url.indexOf('/', pos1 + 1);

            if (pos2 === -1) {
              route = error.config.url.substring(pos1 + 1);
            } else {
              route = error.config.url.substring(pos1 + 1, pos2);
            }
            errorText = errors[route][error.config.method][error.status];
          } else {
            errorText = errors['500'];
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