module.exports = function(grunt) {
  
  grunt.initConfig({
    jshint: {
      files: ["server/**/*.js", "specs/*.js"],
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ['jshint']
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("lint", "jshint");
  
  grunt.registerTask("test", ["jshint", "mochaTest"]);
  grunt.registerTask("default", []);
  /*
  * TODO: Add deployment and clean/concat/minify tasks
  */
};