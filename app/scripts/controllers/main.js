'use strict';

/**
 * @ngdoc function
 * @name pclayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pclayApp
 */
angular.module('pclayApp')
    .controller('MainCtrl', function ($scope, $http, config, AnimateIntro, $mdColorPicker) {

        $scope.loadingBarVisible = false;
        
        $scope.floatingClass = 'floating-blur';

        // color to rotate to render
        $scope.colors = ['0xff0000', '0x00ff00', '0x0000ff', '0xf0f0f0', '0x0f0f0f'];
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
        };

        $scope.pdb = function (id, c, s) {
            return {
                id: id,
                toggled: true,
                class: c,
                style: s
            }
        }
        $scope.surf = function (id, c, s) {
            return {
                id: id,
                toggled: true,
                class: c,
                style: s
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
            console.log("Inside fetchSurf");
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
            $scope.showLoadingBar();

            if(!id) {
                return;
            }
            id = id.toUpperCase();
            if($scope.findDuplicate(id, $scope.surfList)) {
                alert('Surf already rendered');
            } else {
                $scope.glmol.addSurf(id, data, color);

                $scope.$apply(function(){
                    $scope.surfListVisible = true;
                    $scope.surfList.push(new $scope.surf(id, 'md-primary', {'background-color': "#" + color.substring(2)}));
                    console.log($scope.surfList);
                })
            }
            $scope.hideLoadingBar();
        };

        $scope.renderPdb = function (id, data, color) {
            $scope.showLoadingBar();

            if(!id) {
                return;
            }
            id = id.toUpperCase();
            if($scope.findDuplicate(id, $scope.pdbList)) {
                alert('PDB already rendered');
            } else {
                $scope.glmol.addPDBRaw(id, data, color);

                $scope.$apply(function(){
                    $scope.pdbListVisible = true;
                    $scope.pdbList.push(new $scope.pdb(id, 'md-primary', {'background-color': "#" + color.substring(2)}));
                })
            }
            $scope.hideLoadingBar();
        };

        //toggle pdb object visibility
        $scope.pdbToggleGL = function (id) {
            $scope.glmol.pdbToggle(id);
        }
        $scope.pdbToggle = function (p) {
            $scope.pdbToggleGL(p.id);
            if (p.toggled) {
                console.log("hello from the if");
                p.toggled = false;
                p.style.bg = p.style['background-color'];
                p.style['background-color'] = 'white';

            } else {
                console.log("hello from the else");
                p.toggled = true;
                p.style['background-color'] = p.style.bg;
            }
        }

        //toggle surf object visibility
        $scope.surfToggleGL = function (id) {
            $scope.glmol.surfToggle(id);
        }
        $scope.surfToggle = function (s) {
            $scope.surfToggleGL(s.id);
            if (s.toggled) {
                s.toggled = false;
                s.style.bg = s.style['background-color'];
                s.style['background-color'] = 'white';
            } else {
                s.toggled = true;
                s.style['background-color'] = s.style.bg;
            }
        };
        // NEW EDITS
        $scope.togglePdbOpacity = function (pdb) {
            $scope.glmol.togglePdbOpacity(pdb.id);
            if(pdb.toggled){
                pdb.toggled = false;
            }
            else {
                pdb.toggled = true;
            }
        }

        $scope.toggleSurfOpacity = function (surf) {
            $scope.glmol.toggleSurfOpacity(surf.id);
            if(surf.toggled){
                surf.toggled = false;
            }
            else {
                surf.toggled = true;
            }
        }

        $scope.cyclePdbOpacity = function (pdb) {
            $scope.glmol.cyclePdbOpacity(pdb.id);
            if(pdb.toggled){
                pdb.toggled = false;
            }
            else {
                pdb.toggled = true;
            }
        }

        $scope.cycleSurfOpacity = function (surf) {
            $scope.glmol.cycleSurfOpacity(surf.id);
            if(surf.toggled){
                surf.toggled = false;
            }
            else {
                surf.toggled = true;
            }
        }

        // this is the place for the color picker
        $scope.colorSelected = "#FFFFFF"
        $scope.selected = 'None';
        $scope.surfaceOptions = [
            ['Change color', function ($itemScope) {
                $mdColorPicker.show({
                    value:$scope.colorSelected
                }).then(function(color) {
                    // console.log(color);
                    // console.log($itemScope);
                    $itemScope.pdb.style["background-color"] = color;
                    $scope.glmol.changePdbColor($itemScope.pdb.id, color);
                });
            }]
            // null, // Dividier
            // ['Remove', function ($itemScope) {
            //     $scope.items.splice($itemScope.$index, 1);
            // }]
        ];


        $scope.removePdb = function(listPdb, pdb) {
            
            // console.log("Printing pdbList:");
            // listPdb.forEach(function(data){console.log(data);});
            
            $scope.glmol.removePdb(pdb.id);
            
            var index = listPdb.indexOf(pdb);
            console.log("[main.js][removePdb] removing pdb with index " + index + " from pdbList");
            listPdb.splice(index, 1);
            
            // console.log($scope);

            // console.log($scope.pdbList);

            if( $scope.pdbList.length == 0 && $scope.surfList.length == 0 ){
                $scope.showAnimatedIntro();
                $scope.pdbListVisible = false;
            }
            // console.log($scope);
        }

        //bzc220 edit
        $scope.removeSurf = function(listSurf, surf) {
            
            // console.log("Printing surfList:");
            // listSurf.forEach(function(data){console.log(data);});
            
            $scope.glmol.removeSurf(surf.id);
            
            var index = listSurf.indexOf(surf);
            console.log("[main.js][removeSurf] removing surf with index " + index + " from surfList");
            listSurf.splice(index, 1);
            
            // console.log($scope);
            console.log("removeSurf in main.js")
            console.log($scope.surfList);

            if( $scope.pdbList.length == 0 && $scope.surfList.length == 0 ){
                $scope.showAnimatedIntro();
                $scope.surfListVisible = false;
            }
            // console.log($scope);
        }

        // NEW EDITS END
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

        $scope.showAnimatedIntro = function() {
            $(".cd-intro").fadeIn();
        }

        $scope.hideAnimatedIntro = function() {
            $(".cd-intro").fadeOut();
        }

        $scope.showDropNoti = function() {
            $("#dropnoti").fadeIn();
        }

        $scope.hideDropNoti = function() {
            $("#dropnoti").fadeOut();
        }

        $scope.getNewColor = function(type) {
            if(!$scope.glmol) {
                return '0xff0000'; // default to red
            }

            // pdb is handled differently as GLmol will give the color instead
            if(type === "pdb") {
                return '0x' + $scope.glmol.getCurrentColor();
            } else { 
                return '0x' + $scope.glmol.getNewColor();
            }
        }

        // 
        // Test DropZone
        var fileReaderOpts = {

            readAsDefault: 'Text',
            dragClass: "xdrag",
            on: {
                beforestart: function(file) {
                    console.log("in fileReaderOpts: beforestart");    
                    $scope.hideDropNoti();

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
                console.log("in fileReaderOpts: load");
                // console.log(e);
                // console.log(e.target.result);
                // console.log(file);
              },

              loadend: function(e, file) {
                console.log("in fileReaderOpts: loadend");
                console.log($scope);
                // console.log(e);
                // console.log(e.target.result);
                // console.log(file);
                // check extension
                $scope.hideAnimatedIntro();

                if(file.extra) {
                    var ext = file.extra.extension.toLowerCase();
                    var data = e.target.result;
                    var id = file.extra.nameNoExtension;
                    var color = $scope.getNewColor(ext);

                    if(ext === "surf") {
                        $scope.renderSurf(id, data, color);
                    } else if(ext === "pdb") {
                        $scope.renderPdb(id, data, color);
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
        // $("#dropzone-x").fileReaderJS(fileReaderOpts);
        $("#canvas").fileReaderJS(fileReaderOpts);
        $scope.hideDropNoti();
        $("#dropnoti").hide();

        // Test drag
        var dragTimer;
        $('#canvas').on('dragover', function(e) {
            var dt = e.originalEvent.dataTransfer;
            if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
                $scope.showDropNoti();
                window.clearTimeout(dragTimer);
            }
        });
        $('#canvas').on('dragleave', function(e) {
            dragTimer = window.setTimeout(function() {
                $scope.hideDropNoti();
            }, 25);
        });

    });

angular.module('pclayApp').factory('AnimateIntro', function() {
    //set animation timing
    var animationDelay = 2000,
        //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        lettersDelay = 50,
        //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        //clip effect 
        revealDuration = 600,
        revealAnimationDelay = 1500;
    
    initHeadline();
    
    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.cd-headline.letters').find('b'));
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
        $words.each(function(){
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function(){
            var headline = $(this);
            
            if(headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
            } else if (headline.hasClass('clip')){
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type') ) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                    width = 0;
                words.each(function(){
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            };

            //trigger animation
            setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);
        
        if($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting'); 
            setTimeout(function(){ 
                parentSpan.removeClass('selected'); 
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
        
        } else if($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        }  else if($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')){
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
            setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function(){ hideWord(nextWord) }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        }  else if($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
                setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');
        
        if(!$letter.is(':last-child')) {
            setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
        } else if($bool) { 
            setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
        }

        if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        } 
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');
        
        if(!$letter.is(':last-child')) { 
            setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
        } else { 
            if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
            if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    return null;
});


