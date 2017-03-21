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
            name: 'enableGraphQL',
            message: 'Has GraphQl Support',
            default: true
        }]).then((answers) => {
            this.context.configuration.hasGraphQL = answers.enableGraphQL;
            if(!this.context.configuration.hasGraphQL){
                return;
            }
            //add denpendency in project.json
            this.context.globalOps.dependencies['Skimia.Extensions.GraphQl'] = '0.0.1-dev';
            this.context.globalOps.dependencies['GraphQLCore'] = '1.0.0-alpha-0126';
        });
    }

};
