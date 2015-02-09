'use strict';

/**
 * @ngdoc function
 * @name pclayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pclayApp
 */
angular.module('pclayApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   	$scope.floatingClass = 'floating-blur';
    $scope.mouseFloating = function () {
        if(this.mouseover) {
            console.log(this);
            $scope.floatingClass = 'floating-blur';
            this.mouseover = false;
        } else {
            console.log(this);
            $scope.floatingClass = 'floating-show';
            this.mouseover = true;
        }
    };

    // Init scene
    $scope.glmol = new GLmol('glmolX', true, 'canvas');
    $scope.glmol.init();

	// Url for VASPI Server
    var SERVER = 'http://localhost:8000/';

	function init(scope) {
  		//dummy object for input
		scope.input = {};
	  	scope.show = {
	       dropzone: true,
	       surfaces: false,
	       structures: false
	   	};
	   	//list of pdbs
	   	scope.pdbList = [];
	  	//list of surf meshes
  	 	scope.surfList = [];
  	 	//progress bar
  		scope.progress = {};

  		scope.ops = {
  			'surfgen': 'pdb?op=surfgen&id=',
  			'pdb': 'pdb?op=pdb&id='
  		}
	};

   	init($scope);

   	$scope.handleError = function(err){
   		console.log('Error:', err)
   	}
   	 /** reset $scope.input */
    $scope.input.reset = function () {
        $scope.input.name = '';
    };

	/** Get PDB info from server and add it to scene */
    $scope.fetchPdb = function (id) {
//            check for undefined or empty input
    	if ($scope.input.name === undefined || $scope.input.name === '') {
            alert('Please enter PDB ID.');
        } 
        else {
	        // Reset input
	        $scope.input.reset();
	        $http.get(SERVER + $scope.ops.pdb + id)
		        .success(function(data){
		    		console.log('Fetching', id, 'done.');
		        	$scope.glmol.addPDB(id, data);
		        })
				.error(function(err){
					$scope.handleError(err);
				});
        }	
    };

 	/** Get surf with id and add to scene  */
    $scope.fetchSurf = function (id, color) {
    	if ($scope.input.name === undefined || $scope.input.name === '') {
            alert('Please enter Surface ID.');
        } 
        else {
	        // Reset input
	        $scope.input.reset();
	        $http.get(SERVER + $scope.ops.surfgen + id)
		        .success(function(data){
		    		console.log('Fetching', id, 'done.');
		        	$http.get(data.url)
		        		.success(function(data){
	        				/* Parse data and render to canvas */
                			console.log("fetchPdb success");
                			$scope.glmol.addSurf(data, color);
		        		})
		        		.error(function(err){
		        			$scope.handleError(err);
		        		})
		        })
				.error(function(err){
					$scope.handleError(err);
				});
        }	
	};			
});
