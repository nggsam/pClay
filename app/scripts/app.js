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
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
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
  });
