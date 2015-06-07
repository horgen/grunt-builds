module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Compile Less
		less: {
			dev: {
				options: {
					sourceMap: true,
					sourceMapFilename: 'css/theme.css.map'
				},
				files: {
					'build/bootstrap.css': 'src/less/bootstrap.less',
					'css/theme.css': 'src/less/theme.less',
					'css/ckeditor-styles.css': 'src/less/ckeditor-styles.less',
				}
			},
			prod: {
				files: {
					'build/bootstrap.css': 'src/less/bootstrap.less',
					'build/theme.css': 'src/less/theme.less',
					'css/ckeditor-styles.css': 'src/less/ckeditor-styles.less',
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
					'css/theme.css': ['build/theme.css']
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
				dest: 'build/theme.js',
				nonull: true
			},
		},

		// Minify JS
		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'js/theme.js': ['build/theme.js']
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
    			dest: 'fonts/',
    			filter: 'isFile'
			},
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'build/theme.js'
							],
						dest: 'js/'
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
					cwd: 'img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'css/theme.css',
					'js/theme.js'
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
				files: 'src/less/*.less',
            	tasks: ['less'],
			},
			js: {
				files: 'src/js/theme.js',
				tasks: ['concat', 'copy:js']
			}
        },

        // https://github.com/gruntjs/grunt-contrib-clean
		clean: [
			'build',
			'css/theme.css.map'
		]
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
		'copy:fonts',		// Copy Font Awesome fonts to fonts/
		'less:dev', 		// Compiles all Less files in src/less and outputs it in css/theme.css
		'concat', 			// Combines all js files in src/js and outputs it to build/theme.js
		'copy:js',			// Copies build/theme.js to css/theme.js
		'browserSync',
		'watch'				// Watches for changes in src/less/*.less and src/js/*.js
	]);

	grunt.registerTask('prod', [
		'copy:fonts', 		// Copy Font Awesome fonts to fonts/
		'less:prod',		// Compiles all Less files in src/less and outputs it in build/theme.css
		'cssmin',			// Minifies build/theme.css and outputs it in css/theme.css
		'concat', 			// Combines all js files in src/js and outputs it to build/theme.js
		'uglify',			// Minifies build/theme.js and outputs it to js/theme.js
		'imagemin',			// Optimizes all images in img/
		'clean',			// Removes build folders and files
		]);
};
