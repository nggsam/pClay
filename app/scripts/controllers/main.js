'use strict';

/**
 * @ngdoc function
 * @name pclayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pclayApp
 */
angular.module('pclayApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
