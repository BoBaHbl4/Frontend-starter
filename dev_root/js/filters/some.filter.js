(function() {
    'use strict';
    angular
        .module('someApp')
        .filter('someFilter', groupBy);

    function someFilter (){
        console.log('someFilter');
    }

})();