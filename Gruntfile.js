/*
 * Generated on 2014-03-14
 * generator-assemble v0.4.8
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },
    connect: {
      options: {
        port: 8000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: ['<%= config.dist %>']
        }
      }
    },
    watch: {
      assemble: {
        files: [
          '<%= config.src %>/content/posts/*.html',
          '<%= config.src %>/templates/layouts/*.hbs'
        ],
        tasks: ['assemble']
      },
      css: {
        files: ['<%= config.src %>/assets/css/main.scss'],
        tasks: ['sass:compileCSS']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/assets/css/*.css',
          '<%= config.dist %>/content/blog/*.html'
        ]
      }
    },
    sass: {
      compileCSS: {
        files: {
          '<%= config.dist %>/assets/css/main.css': '<%= config.src %>/assets/css/main.scss'
        }
      }
    },
    assemble: {
      options: {
        layoutdir: '<%= config.src %>/templates/layouts',
      },
      posts: {
        options: {
          flatten: true,
          layout: 'entry.hbs',
          ext: '.html',
          collections: [
            {
              title: 'pages',
              sortorder: 'asc',
              sortby: 'date'
            }
          ]
        },
        files: {
          '<%= config.dist %>/blog/': ['<%= config.src %>/content/blog/*.html'],
          '<%= config.dist %>/': ['<%= config.src %>/content/index.html']
        }
      }
    },
    copy: {
      javascript: {
        src: '<%= config.src %>/assets/js/polyfills/picturefill.js',
        dest: '<%= config.dist %>/assets/js/main.js'
      }
    },
    cssmin: {
      minify: {
        files: {
          '<%= config.dist %>/assets/css/main.css': '<%= config.dist %>/assets/css/main.css'
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  grunt.registerTask('build', [
    'clean',
    'sass',
    'assemble',
    'copy',
    'cssmin'
  ]);

  grunt.registerTask('server', [
    'clean',
    'sass',
    'assemble',
    'copy',
    'cssmin',
    'connect:livereload',
    'watch'
  ])

  grunt.registerTask('default', [
    'build'
  ]);

};
