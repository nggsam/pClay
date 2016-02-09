'use strict';

/**
 * @ngdoc function
 * @name pclayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pclayApp
 */
angular.module('pclayApp')
    .controller('MainCtrl', function ($scope, $http, config) {
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

        $scope.handleError = function (err) {
                console.log('Error:', err)
            }
            /** reset $scope.input */
        $scope.input.reset = function () {
            $scope.input.name = '';
        };

        /** Get PDB info from server and add it to scene */
        $scope.fetchPdb = function (id) {
            if(!id) {
                return
            }
            id = id.toUpperCase();
            if($scope.findDuplicate(id, $scope.pdbList)) {
                alert('PDB already rendered');
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
                        $scope.glmol.addPDB(id, data.data);

                        // add to list
                        $scope.pdbList.push(new $scope.pdb(id, 'md-primary'));
                    })
                    .error(function (err) {
                        $scope.handleError(err);
                    });
            }
        };

        /** Get surf with id and add to scene  */
        $scope.fetchSurf = function (id, color) {
            if(!id) {
                return
            }

            id = id.toUpperCase();
            if($scope.findDuplicate(id, $scope.surfList)) {
                alert('Surf already rendered');
            }
            else if ($scope.input.name === undefined || $scope.input.name === '') {
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
                                console.log("fetchPdb success");
                                $scope.glmol.addSurf(id, data, color);

                                // add to list
                                $scope.surfList.push(new $scope.surf(id, 'md-primary'));
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
            console.log('pdb toggle');
            console.log(p);
            if (p.toggled) {
                p.toggled = false;
                p.class = '';
            } else {
                p.toggled = true;
                p.class = 'md-primary';
            }
        }

        //toggle surf object visibility
        $scope.surfToggleGL = function (id) {
            $scope.glmol.surfToggle(id);
        }
        $scope.surfToggle = function (s) {
            $scope.surfToggleGL(s.id);
            console.log('surf toggle');
            console.log(s);
            if (s.toggled) {
                s.toggled = false;
                s.class = '';
            } else {
                s.toggled = true;
                s.class = 'md-primary';
            }
        };
    
        $scope.findDuplicate = function(id, array) {
            for (var i = 0; i < array.length; i++) {
                console.log(array[i]);
                if(array[i].id === id) {
                    return true;
                }
            }
            return false;
        }

        $scope.test = function (mess) {
                console.log(mess);
            }

        // 
        // Test DropZone
        var fileReaderOpts = {
            readAsDefault: 'Text',
            dragClass: "xdrag",
            on: {
                beforestart: function(e) {
                    console.log(e);
                    if(e.extra) {
                        var ext = e.extra.extension.toLowerCase();
                        console.log(ext);
                        if(ext === "surf" && ext === "pdb") {
                            // pdb file
                        } else {
                            // other types? reject
                            alert("Please only drop SURF or PDB files");
                            return false;
                        }
                    }
                },

              load: function(e, file) {
                // console.log(e);
                // console.log(e.target.result);
                // console.log(file);
              },

              loadend: function(e, file) {
                // console.log(e);
                // console.log(e.target.result);
                // console.log(file);
                // check extension
                if(e.extra) {
                    var ext = e.extra.extension.toLowerCase();
                    if(ext === "surf") {
                        // surfile
                        var content = e.target.result;
                        var id = "103D";
                         
                        $scope.glmol.addSurf(id, data, color);

                        // add to list
                        $scope.surfList.push(new $scope.surf(id, 'md-primary'));
                        // call gensurf
                    } else if(ext === "pdb") {
                        // pdb file
                        // how to generate surf file?
                    }
                }
              },
              error: function(e, file) {
                console.log(e);
              },
              groupstart: function(group) {
              },
              groupend: function(group) {
              }
            }
        };
        // $("#file-input, #dropzone").fileReaderJS(fileReaderOpts);
        $("#dropzone-x").fileReaderJS(fileReaderOpts);
        // Disabling autoDiscover, otherwise Dropzone will try to attach twice.
        // Dropzone.autoDiscover = false;
        // var fileDropzone = new Dropzone("div#dropzone-x", {url: "/file/post"});
        // fileDropzone.on("addedfile", function(file) {
        //     console.log("Filed added!");
        //     console.log(file);
        // });

        // fileDropzone.on("error", function(first, second) {
        //     console.log("Error");
        //     console.log(first);
        //     console.log(second);
        // })

            
            /* TESTS ========================== */
//        $scope.input.name = '1';
//        $scope.fetchPdb('103D');
//        $scope.input.name = '1';
//        $scope.fetchPdb('1TUB');
//        $scope.input.name = '1';
//        $scope.fetchSurf('103D');
    });