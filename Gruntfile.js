module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: [
          'public/index.js',
          'public/main/**/*.js',
          'public/view/**/*.js',
          'public/login/**/*.js',
          'public/account/**/*.js',
          'public/signup/**/*.js'
        ],
        dest: 'public/scripts/app.concat.js',
      },
      css: {
        src: ['public/css/angular-snap.min.css','public/css/app.min.css'],
        dest: 'public/css/app.css',
      }
    },

    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        },
        preserveComments: false
      },
      target: {
        files: {
          'public/scripts/app.min.js': ['public/scripts/app.concat.js'],
        }
      }
    },

    cssmin: {
      options: {
        report: 'min'
      },
      target: {
        files: {
          'public/css/app.min.css': ['public/css/theme.css', 'public/css/style.css']
        }
      }
    },

    jshint: {
      files: [
        'public/**/*.js',
        'server/**/*.js',
        'specs/*.js'
      ],
      options: {
        ignores: [
          'public/scripts/*.js'
        ],
      }
    },

    watch: {
      scripts: {
        files: [
          '**/*.js'
        ],
        tasks: [
          'jshint',
          'concat:js',
          'uglify'
        ]
      },
      css: {
        files: 'public/css/*.css',
        tasks: ['cssmin','concat:css']
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false
        },
        src: ["specs/*.js"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("lint", "jshint");
  
  grunt.registerTask('default', ['cssmin','concat','uglify']);

};