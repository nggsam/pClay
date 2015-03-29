'use strict';

/**
 * @ngdoc function
 * @name pclayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pclayApp
 */
angular.module('pclayApp')
.controller('MainCtrl', function ($scope, $http, config, $mdDialog, $mdBottomSheet) {
        $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.floatingClass = 'floating-blur';
        $scope.mouseFloating = function () {
            if (this.mouseover) {
                console.log(this);
                $scope.floatingClass = 'floating-blur';
                this.mouseover = false;
            } else {
                console.log(this);
                $scope.floatingClass = 'floating-show';
                this.mouseover = true;
            }
        };

        $scope.pdb = function (id, c) {
            return {
                id: id,
                toggled: true,
                class: c
            }
        }
        $scope.surf = function (id, c) {
            return {
                id: id,
                toggled: true,
                class: c
            }
        }


        // Init scene
        $scope.glmol = new GLmol('glmolX', true, 'canvas');
        $scope.glmol.init();

        // Url for VASPI Server
        var SERVER = config.server;
        console.log(SERVER);

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
                'pdb': 'pdb?op=pdb&id=',
                'vasp': function(opNum, id1, id2) {
                    var op = '';
                    switch(opNum) {
                        case 0: 
                            op = 'i';
                            break;
                        case 1: 
                            op = 'd';
                            break;
                        case 2: 
                            op = 'u';
                            break;
                        default:
                            console.log("NO SUCH OP!!!");
                            break;
                    };
                    return 'vasp?op=' + op + '&id=' + id1 + '+' + id2;
                }
            }

            //loading bar
            scope.loading = false;
        };

        init($scope);

        $scope.handleError = function (err) {
                console.log('Error:', err)
            }
            /** reset $scope.input */
        $scope.input.reset = function () {
            $scope.input.name = '';
        };

        /** Get PDB info from server and add it to scene */
        $scope.fetchPdb = function (id) {
            $scope.loading = true;
            id = id.toUpperCase();
            if ($scope.findDuplicate(id, $scope.pdbList)) {
                alert('PDB already rendered');
                $scope.loading = !$scope.loading;
            }
            // Check for undefined or empty input
            else if ($scope.input.name === undefined || $scope.input.name === '') {
                alert('Please enter PDB ID.');
            } else {
                // Reset input
                $scope.input.reset();
                $http.get(SERVER + $scope.ops.pdb + id)
                    .success(function (data) {
                        console.log('Fetching', id, 'done.');
                        $scope.glmol.addPDB(id, data);

                        // add to list
                        $scope.pdbList.push(new $scope.pdb(id, 'md-primary'));
                        // turn off loading bar
                        $scope.loading = false;
                    })
                    .error(function (err) {
                        $scope.handleError(err);
                    });
            }
        };

        /** Get surf with id and add to scene  */
        $scope.fetchSurf = function (id, color) {
            $scope.loading = true;
            id = id.toUpperCase();
            if ($scope.findDuplicate(id, $scope.surfList)) {
                alert('Surf already rendered');
                $scope.loading = !$scope.loading;
            } else if ($scope.input.name === undefined || $scope.input.name === '') {
                alert('Please enter Surface ID.');
            } else {
                // Reset input
                $scope.input.reset();
                $http.get(SERVER + $scope.ops.surfgen + id)
                    .success(function (data) {
                        console.log('Fetching', id, 'done.');
                        $http.get(data.url)
                            .success(function (data) {
                                /* Parse data and render to canvas */
                                console.log("fetchSurf success");
                                $scope.glmol.addSurf(id, data, color);

                                // add to list
                                $scope.surfList.push(new $scope.surf(id, 'md-primary'));
                                // turn off loading bar
                                $scope.loading = false;
                            })
                            .error(function (err) {
                                $scope.handleError(err);
                            })
                    })
                    .error(function (err) {
                        $scope.handleError(err);
                    });
            }
        };

        //toggle pdb object visibility
        $scope.pdbToggleGL = function (id) {
            $scope.glmol.pdbToggle(id);

        }
        $scope.pdbToggle = function (p) {
            $scope.pdbToggleGL(p.id);
        }

        //toggle surf object visibility
        $scope.surfToggleGL = function (id) {
            $scope.glmol.surfToggle(id);
        }
        $scope.surfToggle = function (s) {
            $scope.surfToggleGL(s.id);
        };

        $scope.findDuplicate = function (id, array) {
            for (var i = 0; i < array.length; i++) {
                console.log(array[i]);
                if (array[i].id === id) {
                    return true;
                }
            }
            return false;
        }

        /* DRAG AND DROP */

        $scope.onDragComplete = function (data, evt) {
            console.log("drag success, data:", data);
        }
        $scope.onDropComplete = function (from, evt, to) {
            console.log("drop success, data:", "from", from, "to", to);
            $scope.showAdvanced(from, to);
        }
        
        /* Show Dialog */
        $scope.showAdvanced = function(from, to, ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/dialog.html',
                targetEvent: ev,
            })
            .then(function(choice) {
                // do VASP op
                doVASP(choice, from, to, 0xff0000);     
            }, function() {
                // cancelled, HANDLE NOT CHOSING ANYTHING
                $scope.alert = 'You cancelled the dialog.';
            });
        };
        
        function doVASP(op, id1, id2, color) {
            var uri = $scope.ops.vasp(op, id1, id2);
            $scope.loading = true;
            var id = op + id1.toUpperCase() + '+' + id2.toUpperCase();
            if ($scope.findDuplicate(id, $scope.surfList)) {
                alert('Surf already rendered');
            } else {
                // Reset input
                $scope.input.reset();
                $http.get(SERVER + uri)
                .success(function (data) {
                    console.log('Fetching', id, 'done.');
                    $http.get(data.url)
                    .success(function (data) {
                        /* Parse data and render to canvas */
                        console.log("fetchVASP success");
                        $scope.glmol.addSurf(id, data, color);

                        // add to list
                        $scope.surfList.push(new $scope.surf(id, 'md-primary'));
                        // turn off loading bar
                        $scope.loading = false;
                    })
                    .error(function (err) {
                        $scope.handleError(err);
                    })
                })
                .error(function (err) {
                    $scope.handleError(err);
                });
            }
            
        }

        $scope.showBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
              templateUrl: 'views/bottom-sheet.html',
              controller: 'BottomSheetCtrl',
              targetEvent: $event
            }).then(function(clickedItem) {
              $scope.alert = clickedItem.name + ' clicked!';
            });
          };
    
        function DialogController($scope, $mdDialog) {
            $scope.choose = function(choice) {
                $mdDialog.hide(choice);
            };
        }
        
        /* ==== */

        $scope.test = function (mess) {
                console.log(mess);
        }
            /* TESTS ========================== */
        $scope.input.name = '1';
        $scope.fetchPdb('103D');
        $scope.input.name = '1';
        $scope.fetchPdb('103M');
        //        $scope.input.name = '1';
        //        $scope.fetchSurf('103D');
    })
.controller('BottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share-arrow' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.directive('rightClick',function(){
    document.oncontextmenu = function (e) {
       if(e.target.hasAttribute('right-click')) {
           return false;
       }
    };
    return function(scope,el,attrs){
        el.bind('contextmenu',function(e){
            e.preventDefault();
            return attrs.onRightClick;
            // alert(attrs.onRightClick);               
        }) ;
    }
})
.directive("myMethod",function($parse) {
      var directiveDefinitionObject = {
        restrict: 'A',
        scope: { method:'&myMethod' },
        link: function(scope,element,attrs) {
           var expressionHandler = scope.method();
           var id = "123";
            element.bind('contextmenu',function(e){
                e.preventDefault();
                console.log(expressionHandler);
                expressionHandler(id);             
            }) ;
        }
      };
      return directiveDefinitionObject;
  });