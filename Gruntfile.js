// https://24ways.org/2013/grunt-is-not-weird-and-hard/#fn4987692805470b0b5865df-2

// TODO Live reload
// Try Gulp instead grunt

module.exports = function (grunt){

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
			dist: {
				src: [
					'js/*.js', // All JS in the js folder
				],
				dest: 'js/production.js',
			}
		},
      
      uglify: {
          build: {
              src: 'js/production.js',
              dest: 'build/js/production.min.js'
          }
      },
        imagemin: {
          dynamic: {
              files: [{
                  expand: true,
                  cwd: 'img/',
                  src: ['*.{png,jpg,gif}'],
                  dest: 'build/img'
              }]
          }
      },
      watch: {
          scripts: {
              files: ['js/*.js'],
              tasks: ['concat', 'uglify'],
              options: {
                  spawn: false,
                  port:8000,
                  hostname:'localhost',
                  bases:['./public'],
                  livereload:true	
              }
          },
        images: {
              files: ['**/*.{png,jpg,gif}'],
              tasks: ['imagemin'],
              options: {
                  spawn: false,
              }
          },
        sass: {
              files: ['css/*.scss'],
              tasks: ['sass'],
              options: {
                  spawn: false,
              }
          },
      },
      sass: {
          dist: {
              options: {
                  style: 'compressed'
              },
              files: {
                  'build/css/global.css': 'css/main.scss'
              }
          } 
      },
      copy: {
            html: {
                files: [
                    { src: 'index.html', dest: 'build/' }
                ]
            }
         }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};