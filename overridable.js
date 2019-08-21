/*
this contains rules that usually catch mistakes but also stop expected use cases
for these it is totally acceptable to disable these rules on a case by case basis

excellent example is a sparse array, it is easy to type 2 commas by accident without noticing
so the rule will catch those mistakes, and cases where a sparse array is intended
then the comment to disable that tslint rule for that line makes it really clear
that you do really want a sparse array.  

Some rules mention that an additional comment is expected when disabling the rule
so check the comments for the rule you ran into.
*/
exports.rules = {
    "no-sparse-arrays": {
        // overruling this with tslint-disable is totally fine.
        // usually second comma is accident and if intentinal then
        // the tslint comment means the reader is expecting a sparse array.
        severity: "warn"
    },
    "no-bitwise": {
        // & instead of &&, | instead of ||, ~ instead of !, ^ instead of Math.pow
        // very common mistakes, useful to point them out but actual uses of bitwise are
        // expected and will be accompanied with tslint-disable when needed.
        severity: "warn"
    },
    "no-construct": {
        // There are absolutely valid use cases for the primitive object wrappers
        // however it is really easy to not notice that is what is going on.
        // so the tslint-disable should accompany along with explaination for what
        // is trying to be accomplished by using the wrapper and why it is needed.
        severity: "warn"
    },
    "no-dynamic-delete": {
        // I'm not sure what cases would use this but most of them should be using
        // a Map object instead of an object.
        // If there is a case this is useful a tslint-disable with comment on what is intended
        // should be added. Ideally I'd force the computed key to have a union string type instead of
        // just any string.
        severity: "warn"
    },
    "no-invalid-template-strings": {
        // if ${} is actually suppose to show up in a string literal it is fully expected
        // that this will be disabled for that line, but in most cases this is a mistake.
        severity: "warn"
    },
    "prefer-object-spread": {
        // Object spread allows for better type checking and inference.
        // Object.assign can't do decent type-safety because it modifies an object in place.
        // there are cases where Object.assign is required and disabling this rule is understandable - as long as there is a comment
        severity: "error"
    },
    "cyclomatic-complexity": {
        // for your own functions you should never go to very high complexity and if you do try to figure out if there is a way to split into seperate functions.
        // for code that comes from elsewhere feel free to disable this rule, just be sure to mention where the code came from. (why it wasn't refactored immidiately)
        // a comment on top of a function to disable this rule is a good placeholder for "refactor me!"
        severity: "warn",
        options: 16
    },
    "max-file-line-count": {
        // this is intentionally set somewhat low, if you reach it and think it should be refactored then do so.
        // if you feel going over it is justified then disable the rule for that file.
        // be sure to leave comments for how the file might be refactored later
        // the tslint-disable for this rule becomes a good placeholder for "refactor me!"
        severity: "warn",
        options: 3000
    },
    /*
        var related rules
        in general always use let or const when using variables
        the only case using var is acceptable is when using let means you can't
        infer any type for the variable, for example:
        ```typescript
        for(const elem of myArray){
            if(elem.id === myId){
                var myName = elem.name;
                break;
            }
        }
        if(myName !== undefined){
            // do stuff here
        }
        ```
        */
    "no-var-keyword": {
        // there are at least 3 other rules related to the var keyword resulting in weird behaviour
        // as well if variables should be labeled as const then being used to those scoping rules is also good.
        severity: "error"
    },
    "no-duplicate-variable": {
        // we don't allow use of var so this isn't an issue.
        // just use let and const and compiler will check for this.
        severity: "default"
    }
};
