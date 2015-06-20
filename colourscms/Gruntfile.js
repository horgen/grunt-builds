// Grunt build for Colours CMS
// https://github.com/horgen/grunt-builds/tree/master/colourscms

module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Compile Less
		less: {
			dev: {
				options: {
					sourceMap: true,
					sourceMapFilename: 'webroot/css/theme.css.map'
				},
				files: {
					'tmp/build/bootstrap.css': 'src/less/bootstrap.less',
					'webroot/css/theme.css': 'src/less/theme.less',
					'webroot/css/ckeditor-styles.css': 'src/less/ckeditor-styles.less',
				}
			},
			prod: {
				files: {
					'tmp/build/bootstrap.css': 'src/less/bootstrap.less',
					'tmp/build/theme.css': 'src/less/theme.less',
					'webroot/css/ckeditor-styles.css': 'src/less/ckeditor-styles.less',
				}
			}
		},

		// Minify CSS
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			options: {
        		'processImport': false
        	},
			target: {
				files: {
					'webroot/css/theme.css': ['tmp/build/theme.css']
				}
			}
		},

		// Combine JS files
		// https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			dist: {
				src: [
					'bower_components/bootstrap/js/transition.js',
					'src/js/theme.js'
				],
				dest: 'tmp/build/theme.js',
				nonull: true
			},
		},

		// Minify JS
		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'webroot/js/theme.js': ['tmp/build/theme.js']
				}
			}
		},


		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			fonts: {
				expand: true,
				flatten: true,
				src: [
					'bower_components/font-awesome/fonts/*'
				],
    			dest: 'webroot/fonts/',
    			filter: 'isFile'
			},
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'tmp/build/theme.js'
							],
						dest: 'webroot/js/'
					}
				]
			}
		},

		// https://github.com/gruntjs/grunt-contrib-imagemin
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'webroot/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'webroot/img'
				}]
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'webroot/css/theme.css',
					'webroot/js/theme.js'
				]
			},
			options: {
				watchTask: true,
				proxy: 'customer.localhost.no'
			},
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			less: {
				files: 'src/less/**',
            	tasks: ['less'],
			},
			js: {
				files: 'src/js/**',
				tasks: ['concat', 'copy:js']
			}
        },

        // https://github.com/gruntjs/grunt-contrib-clean
		clean: ['tmp/build']
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-notify'); // https://github.com/dylang/grunt-notify
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Task to run when doing 'grunt' in terminal.
	grunt.registerTask('default', [
		'copy:fonts',		// Copy Font Awesome fonts to /webroot/fonts/
		'less:dev', 		// Compiles all Less files in /src/less and outputs it in /webroot/css/theme.css
		'concat', 			// Combines all js files in /src/js and outputs it to /tmp/build/theme.js
		'copy:js',			// Copies /tmp/build/theme.js to /webroot/css/theme.js
		'browserSync',
		'watch'				// Watches for changes in /src/less/** and /src/js/**
	]);

	grunt.registerTask('prod', [
		'copy:fonts', 		// Copy Font Awesome fonts to /webroot/fonts/
		'less:prod',		// Compiles all Less files in /src/less and outputs it in /tmp/build/theme.css
		'cssmin',			// Minifies /tmp/build/theme.css and outputs it in /webroot/css/theme.css
		'concat', 			// Combines all js files in /src/js and outputs it to /tmp/build/theme.js
		'uglify',			// Minifies /tmp/build/theme.js and outputs it to /webroot/js/theme.js
		'imagemin',			// Optimizes all images in /webroot/img/
		'clean',			// Removes build folder and files
		]);
};
