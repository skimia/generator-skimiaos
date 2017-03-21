var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.context = opts.context

        // adds specific global generator options to context
        this.context.globalOps.dependencies = {
            'NETStandard.Library': '1.6.1'
        }
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'version',
            message: 'Version of Your project',
            default: '0.0.1-alpha'
        }]).then((answers) => {
            this.context.configuration.projectVersion = answers.version;
        });
    }

    writing() {
        //generate project.json
        this.fs.copyTpl(
            this.templatePath('project.json'),
            this.destinationPath(this.context.configuration.namespace + '/project.json'),
            {
                version: this.context.configuration.projectVersion,
                deps: JSON.stringify(this.context.globalOps.dependencies)
            }
        );
    }

};
