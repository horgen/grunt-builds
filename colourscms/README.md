# Grunt build for Colours CMS (http://www.colourscms.no)
https://github.com/horgen/grunt-builds/tree/master/colourscms

## Installation:

1. `npm install`

2. `bower install`

## Build tasks

`grunt`

Info here

`grunt prod`

Info here

## File & Folder structure

* **webroot/**
    * **css/**
        * ckeditor-styles.css *(Built by `grunt` and `grunt prod`)*
        * theme.css *(Built by `grunt` and `grunt prod`)*
        * theme.css.map *(Built by `grunt`)*
    * **fonts/**  *(Font Awesome added by copy task)*
    * **js/**
        * theme.js *(Built by `grunt` and `grunt prod`)*
    * **img/** *(Optimized by `grunt prod`)*
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
* **tmp/build/** *(Temporary folder created by `grunt` and `grunt prod`)*
