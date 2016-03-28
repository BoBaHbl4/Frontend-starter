(function() {
    'use strict';
    angular
        .module('someApp')
        .factory('getService', customerService);

    function customerService (
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
                var requestUrlAPI = urlParams.getUrl + urlParams.api + urlParams.custGet;
                var requestUrlVars = urlParams.custId + urlParams.custIdValue + '&' + urlParams.userId + urlParams.userIdValue + '&' + urlParams.ticket + urlParams.ticketValue;

                return $http.get(
                        // Get Request For Customer Profile First
                        requestUrlAPI + 'AccountData?' + requestUrlVars
                    )
                    .then(
                        function (resultsProfile) {

                            // If Customer Profile Get Request Is Successful Next Step
                            return $q.all([
                                $http.get(requestUrlAPI + 'Languages?' + requestUrlVars),
                                $http.get(requestUrlAPI + 'Addresses?' + requestUrlVars),
                                $http.get(requestUrlAPI + 'Audit?'     + requestUrlVars),
                                $http.get(requestUrlAPI + 'Plans?'     + requestUrlVars),
                                $http.get(requestUrlAPI + 'Rates?'     + requestUrlVars),
                                // Services
                                $http.get(requestUrlAPI + 'ServiceLD?' + requestUrlVars),
                                $http.get(requestUrlAPI + 'ServiceSD?' + requestUrlVars),
                                $http.get(requestUrlAPI + 'ServiceCC?' + requestUrlVars),
                                $http.get(requestUrlAPI + 'ServiceDD?' + requestUrlVars)
                            ])
                            .then(function (resultsCommon) {
                                // Insert Customer Profile Data in Common Promise of Get Request
                                resultsCommon.splice(0, 0, resultsProfile);
                                return resultsCommon;
                            })
                            .catch(function (error){
                                console.log(error);
                                console.log('sub_error');
                                // Route to error state if we got error response from server
                                $state.go('error.status');
                                return error;
                            });
                        }
                    )
                    .catch(
                        function (errorCommon) {
                            console.log('error true');

                            // Route to error state if we got error response from server
                            $state.go('error.status');
                            if (errorCommon.status == 404) {
                                console.log(errorCommon.status);
                            }
                            return errorCommon;
                        }
                    );
            }
        };
    }

})();