(function() {
    'use strict';
    config.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider"];
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
                        templateUrl: '../views/header.html'
                    },
                    'data-content':{
                        templateUrl: '../views/data-content.html'
                    },
                    'footer':{
                        templateUrl: '../views/footer.html'
                    }
                }
            })
            .state('root.home', {
                url: '/',
                controller: 'MainCtrl',
                views: {
                    'container@': {
                        templateUrl: '../views/index.html'
                    },
                    'some-inside-tmpl':{
                        templateUrl: '../views/some-inside-tmpl.html'
                    }
                }
            })
            // Error state sample
            // .state('error', {
            //     abstract: true,
            //     url: '',
            //     controller: 'MainCtrl',
            //     views: {
            //         'error': {
            //             templateUrl: '/'
            //         }
            //     }
            // })
            // .state('error.status', {
            //     url: '/error',
            //     controller: 'MainCtrl',
            //     views: {
            //         'container@': {
            //             templateUrl: '/'
            //         },
            //         'error': {
            //             templateUrl: '/',
            //             controller: 'MainCtrl'
            //         }
            //     }
            // })
        ;
    }

})();