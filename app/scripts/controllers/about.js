'use strict';

/**
 * @ngdoc function
 * @name pclayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pclayApp
 */
angular.module('pclayApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
