module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'organization',
            message: 'Your Organization Base Namespace',
            default: 'Skimia', // Default to Skimia Organization
            store: true
        }, {
            type: 'list',
            name: 'type',
            message: 'What is your project type Namespace',
            choices: [
                'Extensions',
                'Plugins'
            ]
        },
        {
            type: 'input',
            name: 'project',
            message: 'Your Project Namespace'
        }
    ],
    buildConfiguration : (answers) => {
        var configuration = answers;

        configuration.namespace = answers.organization + '.' + answers.type + '.' + answers.project;

        return configuration;
    }
};