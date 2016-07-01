app directory is where the magic happens

index.html is the main webpage for the app
	- loads angular from the script tag in the header
	- loads the main stylesheet from the header
	- should put the custom stylesheet after the angular import

styles/main.css - main styles used in the app

the main content of the app is in the script tags in the body of the webpage

the body tag has an attribute for angular to find all the angular dependencies

app.js - defines the angular module
	- angular.module(...){<list of dependecies>} - injects all the dependencies

controllers/main.js
	- dollar sign variables are special variables
	- variables without dollar sign are defined by th euser of the functuon
	- canvas is the tag which enables the views
	- getting pdbs/surfs are loaded by the fileReaderOpts variable/function
	- load and loadend are mandatory functions for the controller

glmol is the main rendering module

defineRepresentation is a function that Brian might want to modify
add a function to GLMol file to change the mesh property of the file