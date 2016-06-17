# pClay
pClay app to extract and present surface of proteins and do CSG operations anaylysis.

## Changelogs:
#### Version: 0.2.0
* Drag and drop function
* SURF and PDB renderer
* Better color scheme
* Add intro

## TODOs:
* Transparency
* White background
* Logos
* More PDB modes
* Option to change colors
* Delete function
* Integrate Surfgen
* Integrate VASP functions
* Better separation between SURF and PDB files

## HOW TO SET UP DEV:
### Install NodeJS:
* Linux: I recommend NVM: https://github.com/creationix/nvm
* Windows: https://nodejs.org 
* After this step, you should have `npm` in your terminal. Try to type `npm` and see if there's anything on the screen

### Install web utilities: go to the top directory (./pClay/)
* grunt: `npm install -g grunt-cli` (g stand for global)
* bower: `npm install -g bower`
* dev dependencies: `npm install --dev`
* node dependencies: `npm install`
* bower components: `bower install`

### Turn on dev server:
* You should have `grunt`: try `grunt` in the terminal and see if there's anything on the screen  
* Spin off dev server: `grunt serve`. You should see pClay in your browser now. Try to edit files and the server should restart to show new changes.
* There're more commands to `grunt`. Take a look at Gruntfile.js to get a better understanding of the whole serving process (it might not be too helpful though). Or look up `grunt` tutorials to learn more about it.

### Stack:
pClay is built with Angular 1.3 so a getting to know Angular is important. There're some really good tutorial courses online: I recommend *codeschool* and *egghead*. 
