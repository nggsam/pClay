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
    //'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMdIcons'
  ])
    .constant('config', {
        appName: 'pClay',
        server: 'http://54.165.42.10:8000/' //TODO: make an ENV for this
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
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