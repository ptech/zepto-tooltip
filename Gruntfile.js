/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
      ' *\n' +
      ' * Licensed under the Apache License, Version 2.0 (the "License");\n' +
      ' * you may not use this file except in compliance with the License.\n' +
      ' * You may obtain a copy of the License at\n' +
      ' *\n' +
      ' *      http://www.apache.org/licenses/LICENSE-2.0\n' +
      ' *\n' +
      ' * Unless required by applicable law or agreed to in writing, software\n' +
      ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
      ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
      ' * See the License for the specific language governing permissions and\n' +
      ' * limitations under the License.\n' +
      ' */\n',
    // Task configuration.
    clean: {
      dist: ['dist']
    },
    jshint: {
      options: {
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true
      },
      grunt: ['package.json', 'Gruntfile.js'],
      src: {
        options: {
          browser: true,
          indent: 4,
          quotmark: 'single',
          globals: {
            $: false
          }
        },
        src: ['src/**/*.js']
      }
    },
    csslint: {
      options: {
        'adjoining-classes': false,
        'fallback-colors': false,
        'import': false
      },
      basetheme: {
        src: 'themes/base/*.css'
      },
      smooththeme: {
        src: 'themes/smooth/*.css'
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      js: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      basetheme: {
        src: ['themes/base/<%= pkg.name %>.css'],
        dest: 'dist/css/base/<%= pkg.name %>.css'
      },
      smooththeme: {
        src: ['themes/smooth/<%= pkg.name %>.css'],
        dest: 'dist/css/smooth/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.js.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      basetheme: {
        src: ['<%= concat.basetheme.dest %>'],
        dest: 'dist/css/base/<%= pkg.name %>.min.css'
      },
      smooththeme: {
        src: ['<%= concat.smooththeme.dest %>'],
        dest: 'dist/css/smooth/<%= pkg.name %>.min.css'
      }
    },
    compress: {
      zip: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          {expand: true, cwd: 'dist', src: ['**']}
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Registered tasks.
  grunt.registerTask('build', ['jshint', 'csslint', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('release', ['clean', 'build', 'compress']);
};
