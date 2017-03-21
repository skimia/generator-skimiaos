var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.context = opts.context;

        // adds specific global generator options to context
        this.context.globalOps.addLines = {
            app: [],
            services: [],
            deps: []
        };
    }

    prompting() {
        return this.prompt([{
            type: 'confirm',
            name: 'enableExtcore',
            message: 'Is an Extcore Extension?',
            default: true
        }]).then((answers) => {
            // adds specific generator config to context
            this.context.configuration.isExtcoreProject = answers.enableExtcore;
            this.context.configuration.extcore = {};

            //add denpendency in project.json
            this.context.globalOps.dependencies['ExtCore.Infrastructure'] = '1.1.0';

            return this.prompt([{
                type: 'confirm',
                name: 'hasConfigureActions',
                message: 'Has Configure Actions (app.UseXxx)',
                default: false
            }, {
                type: 'confirm',
                name: 'hasConfigureServices',
                message: 'Has Configure Services (services.AddXxx)',
                default: true
            }]).then((answers) => {
                this.context.configuration.extcore = answers;
            });
        });
    }

    writing() {
        //generate base class
        this.fs.copyTpl(
            this.context.configuration.isExtcoreProject ? this.templatePath('ClassExtCore.cs') : this.templatePath('Class.cs'),
            this.destinationPath(this.context.configuration.namespace + '/' + this.context.configuration.project + '.cs'),
            {
                project: this.context.configuration.project,
                namespace: this.context.configuration.namespace,
                extcore: this.context.configuration.extcore,
                addLines: this.context.globalOps.addLines
            }
        );
    }

};
