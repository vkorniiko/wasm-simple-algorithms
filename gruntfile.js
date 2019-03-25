"use strict";
const inspect = require("util").inspect,
  EOL = require("os").EOL;

module.exports = function(grunt) {
  grunt.initConfig({
    eslint: {
      options: {
        configFile: ".eslintrc"
      },
      target: ["gruntfile.js", "source/**/*.js"]
    },

    "qunit-node": {
      options: {
        noglobals: true
      },
      test: {
        src: ["test/*.js"],
        options: {
          setup: function (QUnit) {
            QUnit.on("testEnd", function (testEnd) {
              if(testEnd.status === "failed"){
                testEnd.errors.forEach(function (error) {
                  const actual = inspect(error.actual),
                    expected = inspect(error.expected),
                    reason = "Actual value " + actual + 
                      " does not match expected value " + expected,
                    message = EOL + ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + EOL +
                          "Description: " + error.message + EOL +
                          "Reason: " + reason + EOL +
                          "Stack: " + error.stack;

                  grunt.log.writeln();
                  grunt.log.errorlns(message);
                });

                grunt.log.write("F");
              }
              else
                grunt.log.write(".");
            });
          }
        }
      }
    },

    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: "./coverage/instrument/app/"
      }
    },

    instrument: {
      files: "source/**/*.js",
      options: {
        lazy: true,
        basePath: "test/coverage/instrument/"
      }
    },

    storeCoverage: {
      options: {
        dir: "test/coverage/reports"
      }
    },

    makeReport: {
      src: "test/coverage/reports/**/*.json",
      options: {
        type: "lcov",
        dir: "test/coverage/reports",
        print: "detail"
      }
    },

    clean: ["doc/*"],

    jsdoc: {
      dist: {
        src: ["source/**/*.js"],
        options: {
          destination: "doc"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-qunit-node");
  grunt.loadNpmTasks("grunt-istanbul");
  grunt.loadNpmTasks("grunt-env");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("default", ["eslint", "env:coverage", "instrument",
    "qunit-node", "storeCoverage", "makeReport", "clean", "jsdoc"]);
};
