var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.context = opts.context
    }

    prompting() {
        if (!this.context.configuration.isExtcoreProject) {
            return;
        }
        return this.prompt([{
            type: 'confirm',
            name: 'enableConfig',
            message: 'Has Configurations Options',
            default: true
        }]).then((answers) => {
            this.context.configuration.hasConfiguration = answers.enableConfig;
            if(!this.context.configuration.hasConfiguration){
                return;
            }

            //add denpendency in project.json
            this.context.globalOps.dependencies['Microsoft.Extensions.Options'] = '1.1.0';
            this.context.globalOps.dependencies['Microsoft.Extensions.Configuration.Binder'] = '1.1.0';
            
            //set line in base class
            this.context.globalOps.addLines.services.push('services.Configure<' + this.context.configuration.project + 'Options>(options => configurationRoot.GetSection("' + this.context.configuration.type + ':' + this.context.configuration.project + '").Bind(options));');
            this.context.globalOps.addLines.deps.push('using Microsoft.Extensions.Configuration;');
            this.context.globalOps.addLines.deps.push('using ' + this.context.configuration.namespace + '.Configuration;');
        });
    }

    writing() {
        if (!this.context.configuration.isExtcoreProject || !this.context.configuration.hasConfiguration) {
            return;
        }
        //generate ProjectConfig.json
        this.fs.copyTpl(
            this.templatePath('Configuration/ProjectOptions.cs'),
            this.destinationPath(this.context.configuration.namespace + '/Configuration/' + this.context.configuration.project + 'Options.cs'),
            {
                namespace: this.context.configuration.namespace,
                project: this.context.configuration.project
            }
        );
    }

};
