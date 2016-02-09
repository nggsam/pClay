'use strict';

/**
 * @ngdoc overview
 * @name pclayApp
 * @description
 * # pclayApp
 *
 * Main module of the application.
 */
angular
    .module('pclayApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMdIcons'
  ])
    .constant('config', {
<<<<<<< HEAD
        appName: 'SMS',
        server: 'http://54.165.42.10:8000/' //TODO: make an ENV for this
=======
        appName: 'pClay',
        // server: 'http://54.65.95.7:8000'
        server: 'http://localhost:8000/'
>>>>>>> dropzone
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl as ctrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

    });