(function() {
    'use strict';

    angular
        .module('someApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl (
        $scope,
        cfpLoadingBar,
        getService) {

        console.log('Main controller');

        // Set Url For Any "Data Get Service"
        var apiUrl = appConstant.API_URL;

    }

})();