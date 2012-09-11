/*global module:false*/
module.exports = function(grunt) {

  // Grunt plugins
  grunt.loadNpmTasks('grunt-css');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*!\n' +
          ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
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
          ' */'
    },
    concat: {
      js: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      base_theme: {
        src: ['<banner:meta.banner>', '<file_strip_banner:themes/base/<%= pkg.name %>.base.css>'],
        dest: 'dist/css/<%= pkg.name %>.base.css'
      },
      smooth_theme: {
        src: ['<banner:meta.banner>', '<file_strip_banner:themes/smooth/<%= pkg.name %>.smooth.css>'],
        dest: 'dist/css/<%= pkg.name %>.smooth.css'
      }
    },
    min: {
      js: {
        src: ['<banner:meta.banner>', '<config:concat.js.dest>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      base_theme: {
        src: ['<config:concat.base_theme.dest>'],
        dest: 'dist/css/<%= pkg.name %>.base.min.css'
      },
      smooth_theme: {
        src: ['<config:concat.smooth_theme.dest>'],
        dest: 'dist/css/<%= pkg.name %>.smooth.min.css'
      }
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js']
    },
    csslint: {
      base_theme: {
        src: 'themes/base/*.css',
        rules: {
          "adjoining-classes": false,
          "box-model": false
        }
      },
      smooth_theme: {
        src: 'themes/smooth/*.css',
        rules: {
          "adjoining-classes": false,
          "box-model": false,
          "import": false
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        $: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('build', 'lint csslint concat min cssmin');

};
