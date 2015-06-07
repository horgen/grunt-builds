# Grunt build for Colours CMS
https://github.com/horgen/grunt-builds

## Installation:

1. `npm install`

2. `bower install`

## Build tasks

`grunt`

Info here

`grunt prod`

Info here

## File & Folder structure

* **css/**
    * ckeditor-styles.css *(Built by `grunt` and `grunt prod`)*
    * theme.css *(Built by `grunt` and `grunt prod`)*
    * theme.css.map *(Built by `grunt` and removed by `grunt prod`)*
* **fonts/**  *(Font Awesome added by copy task)*
* **js/**
    * theme.js *(Built by `grunt` and removed by `grunt prod`)*
* **img/** (Gets optimized with grunt-contrib-imagemin)
* **src/**
    * **js/**
        * theme.js
    * **less/**
        * bootstrap.less
        * ckeditor-styles.less
        * scaffolding.less
        * theme.less (imports all other Less files)
        * utilities.less
        * variables.less
* **build/** *(Temporary folder created by `grunt` and `grunt prod`)*
