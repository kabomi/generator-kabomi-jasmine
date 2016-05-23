"use strict";

var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Next, add your custom code
        //this.option('coffee'); // This method adds support for a `--coffee` flag

        //Composing
        this.composeWith('karma:app',
        {
            options: {
                "base-path": '../',
                frameworks: ['jasmine'],
                reporters: ['dots', 'osx'],
                "web-port": 9003,
                colors: true,
                "app-files": 'src/**/*.js',
                "test-files": 'test/**/*.js',
                plugins: ['karma-osx-reporter']
            }
        },{
            local: require.resolve('generator-karma/generators/app/index.js')
        });
    },

    method1: function () {
        console.log('method 1 just ran');
    },
    initializing: {
        method2: function () {
            console.log('method 2 just ran');
        }
    },
    writing: {
        addTemplates: function () {
            var appTemplateFile = 'app.js';
            var appTestTemplateFile = 'appSpec.js';
            var testPath = path.join('test');
            var srcPath = path.join('src');
            var appFile = path.join(srcPath, appTemplateFile);
            var appTestFile = path.join(testPath, appTestTemplateFile);

            // Copy template files
            try {
                this.fs.copyTpl(
                    this.templatePath(appTemplateFile),
                    this.destinationPath(appFile),
                    {});
                this.fs.copyTpl(this.templatePath(
                    appTestTemplateFile),
                    this.destinationPath(appTestFile),
                    {});
            }catch(ex){
                console.log(ex);
            }
        }
    }
});
