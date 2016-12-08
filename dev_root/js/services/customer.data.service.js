(function() {
    'use strict';
    getService.$inject = ["$http", "$q", "$state", "$timeout"];
    angular
        .module('someApp')
        .factory('getService', getService);

    function getService (
        $http,
        $q,
        $state,
        $timeout) {

        // "Customer Data Get Service"
        console.log('GetService Data Get Service Starts');

        return {

            getDataItems: function (urlParams){
                
                console.log('GetService Data Get Service Exec');
                
                // Set common url variable for request
                var requestUrlStartParamsAPI = urlParams.anyParams;
                var requestUrlParams = urlParams.custId + urlParams.custIdValue + '&' + urlParams.userId + urlParams.userIdValue + '&' + urlParams.ticket + urlParams.ticketValue;

                return $http.get(
                        // Get Request For Customer Profile First
                        requestUrlStartParamsAPI + 'AccountData?' + requestUrlParams
                    )
                    .then(
                        function (results) {
                            console.log('Results')
                        }
                    )
                    .catch(
                        function (error) {
                            console.log('Error true');

                            // Route to error state if we got error response from server (sample)
                            $state.go('error.status');
                            if (error.status == 404) {
                                console.log(error.status);
                            }
                            return error;
                        }
                    );
            }
        };
    }

})();