(function() {
    'use strict';
    angular
        .module('someApp')
        .filter('someFilter', someFilter);

    function someFilter (){
        console.log('someFilter');
    }

})();