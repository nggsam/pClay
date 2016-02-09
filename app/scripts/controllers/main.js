'use strict';

/**
 * @ngdoc function
 * @name controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('pclayApp')
<<<<<<< HEAD
.controller('MainCtrl', function ($timeout, $q, $log, $interval, $http) {

    var self = this;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    self.simulateQuery = true;
    self.isDisabled    = false;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.noCache = true; 

    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : [],
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + item);
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Google, Twitter, Games, Clash of clans, Facebook, Watcher, Slenderman, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              ';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
=======
    .controller('MainCtrl', function ($scope, $http, config) {

        $scope.loadingBarVisible = false;

        
        $scope.floatingClass = 'floating-blur';


        // color to rotate to render
        $scope.colors = ['0xff0000', '0x00ff00', '0x0000ff', '0xf0f0f0'];
        $scope.colorsIndex = 0; 

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
>>>>>>> dropSurf
        };
<<<<<<< HEAD
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }

    self.personals = [{name: 'Bing'}];

    self.works = [{name: 'Broadcast'}, {name: 'Watcher'}];

    var SERVER = 'http://azurex-40m64724.cloudapp.net:8080/';

    var brURL = SERVER + 'granny';

    var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];

    $http.get(brURL).success(function(res){
        console.log(res);
        self.granny = res;
        self.colorTiles = (function() {
              var tiles = [];
              for (var i = 0; i < self.granny.length; i++) {
                var color = '#98fb98';
                var current = self.granny[i];
                var span = 1;
                if(current.emergency) {
                    color = '#ff0000';
                    span = 2;
                }
                tiles.push({
                  color: color,
                  colspan: span,
                  rowspan: span,
                  name: current.name,
                  time:time(Date.parse(current.time)),
                  emergency: current.emergency ? 'Emerg!' : ''
                });
              }
              return tiles;
        })();
    }).error(function(err){
        console.log(err);
    });

    console.log('QUERYING');
    $interval(function(){
        $http.get(brURL).success(function(res){
            console.log(res);
            self.granny = res;
            self.colorTiles = (function() {
              var tiles = [];
              for (var i = 0; i < self.granny.length; i++) {
                var color = '#98fb98';
                var current = self.granny[i];
                var span = 1;
                if(current.emergency) {
                    color = '#ff0000';
                    span = 2;
                }
                tiles.push({
                  color: color,
                  colspan: span,
                  rowspan: span,
                  name: current.name,
                  time: time(Date.parse(current.time)),
                  emergency: current.emergency ? 'Emergency!' : ''
                });
              }
              return tiles;
            })();
        }).error(function(err){
            console.log(err);
        })
        console.log('QUERYING');
    }, 3000);


    self.grannize = function(g){
        self.grannyDetail = g.name + ' ' + g.time + ' ' + g.emergency;
    }

    self.channelAll = '';
    self.messageAll = '';

    var pURL = SERVER + 'broadcastall';
    self.broadcast = function(mes) {
        console.log(mes);
        self.channelAll = '';
        self.messageAll = '';
        self.progressing = true;
        $http({
            url: pURL,
            method: "POST",
            data: { 'message' : mes }
        })
        .success(function(response) {
                self.progressing = false;
                console.log('Success!');
                // success
            }).error(
            function(response) { // optional
                self.progressing = false;
                console.log(response);
                // failed
            });

        $timeout(function(){
            self.progressing = false;
        }, 3000)
    }

    function randomColor() {
      return COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    function randomSpan() {
      // var r = Math.random();
      return 1;
      // if (r < 0.8) {
      //   return 1;
      // } else if (r < 0.9) {
      //   return 2;
      // } else {
      //   return 3;
      // }
    }

    function time(m) {
        var date = new Date(m);
        var minute = date.getMinutes();
        var hour = date.getHours();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return hour +':' + minute;
    }

   
    angular.element(document).ready(function () {
        console.log('Hello World');
        Chart.defaults.global.scaleFontColor = "#fff";
        var ctx = $("#myChart").get(0).getContext("2d");
         var data = {
             labels: ["Pizza", "Dartmouth", "Hackathon", "Is", "Awesome", "No?", "Yes!"],
             datasets: [
                 {
                     label: "My First dataset",
                     fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
                     data: [65, 59, 78, 85, 95, 80, 100]
                 }             ]
         };
         
         var myLineChart = new Chart(ctx).Line(data);     
    });
});
=======

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

        /** Render surf with id and add to scene  */
        $scope.renderSurf = function (id, data, color) {
            console.log('Rendering', id, color);
            $scope.showLoadingBar();
            if(!id) {
                return
            }
            id = id.toUpperCase();
            if($scope.findDuplicate(id, $scope.surfList)) {
                alert('Surf already rendered');
            } else {
                $scope.glmol.addSurf(id, data, color);

                $scope.$apply(function(){
                    $scope.surfListVisible = true;
                    $scope.surfList.push(new $scope.surf(id, 'md-primary'));
                })

                console.log($scope.surfList);
            }
            $scope.hideLoadingBar();
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
        };

        $scope.showLoadingBar = function() {
            $scope.$apply(function(){
                $scope.loadingBarVisible = true;
            });
        };

        $scope.hideLoadingBar = function() {
            $scope.$apply(function(){
                $scope.loadingBarVisible = false;
            })
        };

        // 
        // Test DropZone
        var fileReaderOpts = {
            readAsDefault: 'Text',
            dragClass: "xdrag",
            on: {
                beforestart: function(file) {
                    $scope.showLoadingBar();
                    if(file.extra) {
                        var ext = file.extra.extension.toLowerCase();
                        if(ext === "surf" || ext === "pdb") {
                            // pdb or surf file
                        } else {
                            // other types? reject
                           $scope.hideLoadingBar();
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
                if(file.extra) {
                    var ext = file.extra.extension.toLowerCase();
                    if(ext === "surf") {
                        // SURF file
                        var data = e.target.result;
                        var id = file.extra.nameNoExtension;
                        var color = $scope.colors[$scope.colorsIndex++]; 
                        // if out of bound, reset 
                        if($scope.colorsIndex == $scope.colors.length)
                            $scope.colorsIndex = 0;

                        $scope.renderSurf(id, data, color);

                    } else if(ext === "pdb") {
                        // pdb file
                        // how to generate surf file?
                    }
                }

                $scope.hideLoadingBar();
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
>>>>>>> dropzone
