# Grunt build with Bootstrap 3.3.5 grid only
https://github.com/horgen/grunt-builds/tree/master/bootstrap-grid

## Installation:

1. `npm install`

2. `bower install`

## Build tasks

`grunt`

Info here

`grunt prod`

Info here

## File & Folder structure

* **dist/**
    * **src/**
        * app.css *(Built by `grunt` and removed by `grunt prod`)*
        * app.css.map *(Built by `grunt` and removed by `grunt prod`)*
        * app.js *(Built by `grunt` and removed by `grunt prod`)*
        * app.min.css *(Built by `grunt prod`)*
        * app.min.js *(Built by `grunt prod`)*
    * index.html *(Built by `grunt` and `grunt prod`)*
    * **img/** *(Optimized by `grunt prod`)*
* **src/**
    * **js/**
        * app.js
    * **less/**
        * app.less *(includes all files in this folder)*
        * bootstrap.less *(includes Bootstrap grid)*
        * scaffolding.less
        * variables.less
    * index.html
