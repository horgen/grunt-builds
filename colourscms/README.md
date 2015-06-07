# Grunt build with React, jQuery and Less

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
    * **img/**
* **src/**
    * **js/**
        * **jsx/**app.jsx
        * app.js
    * **less/**
        * app.less *(imports bower_components/normalize.css/normalize.css)*
    * index.html
* **tmp/build/** *(Temporary folder created by `grunt` and `grunt prod`)*
