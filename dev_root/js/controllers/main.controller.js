(function() {
    'use strict';

    MainCtrl.$inject = ["$scope", "cfpLoadingBar", "appConstant", "getService"];
    angular
        .module('someApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl (
        $scope,
        cfpLoadingBar,
        appConstant,
        getService) {

        console.log('Main controller');

        // Set Url For Any "Data Get Service"
        var apiUrl = appConstant.API_URL;

    }

})();