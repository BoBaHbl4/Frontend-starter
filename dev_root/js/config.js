(function() {
    'use strict';
    angular
        .module('someApp')
        .config(config);

    function config(
        $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        console.log('Config');

        // Loading Bar
        cfpLoadingBarProvider.spinnerTemplate = '' +
            '<div class="page-spinner"><i class="fa fa-spinner fa-pulse page-spinner-icon text-primary"></i></div>';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root',{
                url: '',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: '/'
                    },
                    'data-content':{
                        templateUrl: '/'
                    },
                    'footer':{
                        templateUrl: '/'
                    }
                }
            })
            .state('root.home', {
                url: '/',
                controller: 'MainController',
                views: {
                    'container@': {
                        templateUrl: '../../build/views/index.html'
                    },
                    'customer-profile-info':{
                        templateUrl: '/'
                    }
                }
            })
            .state('error', {
                abstract: true,
                url: '',
                controller: 'MainController',
                views: {
                    'error': {
                        templateUrl: '/'
                    }
                }
            })
            .state('error.status', {
                url: '/error',
                controller: 'MainController',
                views: {
                    'container@': {
                        templateUrl: '/'
                    },
                    'error': {
                        templateUrl: '/',
                        controller: 'MainController'
                    }
                }
            })
        ;
    }

})();