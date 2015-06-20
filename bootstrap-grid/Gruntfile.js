// Grunt build with React, jQuery and Less
// https://github.com/horgen/grunt-builds/tree/master/react

module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			dist: {
				expand: true,
				flatten: true,
				src: [
					'src/index.html'
				],
    			dest: 'dist/',
			}
		},

		processhtml: {
			dist: {
				files: {
					'dist/index.html': ['dist/index.html']
				}
			},
		},

		// https://github.com/gruntjs/grunt-contrib-htmlmin
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: '',
					src: 'dist/index.html',
					dest: 'dist/'
				}]
			}
		},

		// Compile Less
		less: {
			dist: {
				options: {
					// strictImports: true,
					sourceMap: true,
					sourceMapFilename: 'dist/src/app.css.map'
				},
				files: {
					'dist/src/app.css': 'src/less/app.less'
				}
			}
		},

		// Minify CSS
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			/*options: {
        		'processImport': false
        	},*/
			target: {
				files: {
					'dist/src/app.min.css': ['dist/src/app.css']
				}
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
					cwd: 'dist/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/img'
				}]
			}
		},

		// Combine JS files
		// https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			dist: {
				src: [
					// 'bower_components/jquery/dist/jquery.js',
					'src/js/app.js'
				],
				dest: 'dist/src/app.js',
				nonull: true
			},
		},

		// Minify JS
		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'dist/src/app.min.js': ['dist/src/app.js']
				}
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'dist/src/app.css',
					'dist/src/app.js',
					'dist/index.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./dist"
				}
			},
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			html: {
				files: 'src/*.html',
            	tasks: ['copy'],
			},
			less: {
				files: 'src/less/**',
            	tasks: ['less'],
			},
			js: {
				files: [
					'src/js/**'
				],
				tasks: ['concat']
			}
        },

        // https://github.com/gruntjs/grunt-contrib-clean
		clean: [
			'dist/src/app.css',
			'dist/src/app.css.map',
			'dist/src/app.js'
		]
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
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
		'copy', 			// Copies src/index.html to index.html
		'less', 			// Compiles all Less files in src/less
		'concat', 			// Combines all js files to dist/app.js
		'browserSync',
		'watch'				// Watches for changes in src/*.html, src/less/** and src/js/**
	]);

	grunt.registerTask('prod', [
		'copy', 			// Copies src/index.html to index.html
		'processhtml',		// Replaces the css and js paths in index.html with the minimized versions
		'htmlmin',			// Removes comments and whitespace from *.html
		'less',				// Compiles all Less files in src/less
		'cssmin',			// Minifies the css files
		'concat',			// Combines all js files to dist/app.js
		'uglify',			// Minifies dist/app.js to dist/app.min.js
		'imagemin',			// Optimizes all images in img/
		'clean',			// Removes build folders and files
		]);
};
