(function() {
    'use strict';
    angular
        .module('someApp')
        .directive('apiErrorMessage', apiErrorMessage);

    function apiErrorMessage () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: '../views/api-error-message.html'
        };
    }

})();