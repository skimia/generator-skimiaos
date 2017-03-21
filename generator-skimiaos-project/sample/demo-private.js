var Generator = require('yeoman-generator');

class MyBase extends Generator {
    helper() {
        console.log('methods on the parent generator won\'t be called automatically');
    }
}

module.exports = class extends MyBase {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts)

        this.helperMethod = function () {
            console.log('won\'t be called automatically');
        };
    }

    method1() {
        this.log('method 1 just ran twice');
        this.helper();
        this._private_method();
        this.helperMethod();
    }

    //Prefix method name by an underscore (e.g. _private_method).
    _private_method() {
        console.log('private hey');
    }
};
