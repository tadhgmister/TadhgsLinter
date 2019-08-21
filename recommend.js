/*
these rules are between strict (should not override) and overridable (expected to be overriden)
they are generally encouraged to follow but cases exist where it may be preferable to bypass the rule.

*/
exports.rules = {
    //// ban
    // the ban rule and the several other rules that are not used because they are covered by ban
    ban: {
        // ban should always be warning only, and exceptions are expected to exist for most of these.
        // tslint-disable-next-line along with reasonable explaination is acceptable.
        severity: "warn",
        options: [
            // forEach creates additional stack frames which is harder to debug,
            // and can't use continue or break, instead return means break which is confusing.
            // just use for-of loops, they are so much cleaner.
            {
                name: ["*", "forEach"],
                message: "Use a regular for loop instead."
            },
            {
                // don't use eval. just don't.
                name: ["eval"],
                message:
                    "don't use eval, see alternatives here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!"
            },
            {
                // name and length are annoyingly global variables, accidental references to them should be caught.
                name: ["name"],
                message:
                    "global variable 'name' is almost certainly not what you meant to use."
            },
            {
                name: ["length"],
                message:
                    "global variable 'length' is almost certainly not what you meant to use."
            },
            {
                ///////////////// TODO - ACTUALLY MAKE A UTILS CONSOLE
                name: ["console"],
                // note that we don't block using window.console, so using that directly should be fine.
                message: "use utils.console instead."
            }
        ]
    },
    "no-eval": {
        // covered by ban rule, using ban instead of this because I can attach the link directly in tslint message.
        severity: "off"
    },
    //// Rules to help cleanup during development
    // these rules are intended to only need to be fixed when commiting
    // most either point out a work in progress or point to a debugging feature
    "no-empty": {
        // instead of adding a // TODO (which is labeled as non empty by this rule)
        // I prefer leaving the blocks that I want to come back to empty then get a warning
        // leading me back.  If a block actually is intended to do nothing add a comment in the block
        // with a simple statement for why nothing should happen. the comment makes the block non-empty.
        severity: "warn"
    },
    "no-empty-interface": {
        // will let the no-empty-block deal with this instead.
        // an empty interface with a to do should be just as fine.
        severity: "off"
    },
    "no-magic-numbers": {
        // most cases at minimum a comment should be attached to any number literal
        // storing in a constant with a short doc-string is even better.
        severity: "warn",
        // default doesn't complain about -1,0,1 but sometimes counting in a list by
        // 2s is viable, and freqeuntly I use small numbers for test functions s
        // suppressing the warnings there too is good.
        options: [-3, -2, -1, 0, 1, 2, 3, 4, 5]
    },
    "no-debugger": {
        // debugger is excellent for development, useful to be warned about when commiting.
        severity: "warn"
    },
    "no-shadowed-variable": {
        // shadowed variable is usually fine, especially shouldn't stop development
        // but in nearly all cases the variable should be renamed before commiting
        // so it is clear what is being used where
        severity: "warn"
    },
    "no-unused-expression": {
        // most cases an expression without something to do with it is a mistake
        // usually because the code is mid-written, but it is expected to override this rule
        // for reasonable cases, a comment explaining what side effect is happening
        // should accompany the tslint-disable comment.
        severity: "warn"
    },
    "no-void-expression": {
        // usually a mistake to pass void to something else,
        severity: "warn",
        // allow arrow functions to just call a void function without curly braces.
        options: "ignore-arrow-function-shorthand"
    },
    "no-duplicate-imports": {
        // really wish this had a fixer, the alphabetizer works better
        // when all imports are together.
        severity: "warn"
    },
    "prefer-const": {
        // want to auto-fix to const when possible, makes the code easier to follow and
        // when adding assignment to the variable for first time useful to bring attention to
        // the fact that nothing was re-assigning before.
        severity: "warn",
        // fixer can't do anything when checking that anything in desctructure can be const,
        // so for simplicity only complain (and fix) when all destructures are treated as const.
        options: { destructuring: "all" }
    },
    "prefer-readonly": {
        // If this had an auto-fixer I'd be happier.
        // same rational as const, if nothing ever modifies a property then set it readonly.
        // if later you do need to reassign it bring attention to the fact that nothing previous was chanign
        // let the dev decide if it makes sense to remove readonly.
        // particularly useful for public fields so outside it's super clear that fields aren't intended to change.
        severity: "warn",
        // TODO: make an auto-fixer for this rule then change this to apply to all fields.
        options: "only-inline-lambdas"
    },

    //// general

    "no-implicit-dependencies": {
        // fixing this is usually as simple as adding --save when first installing some new dependancy.
        // or adding to package.json. I believe this affects how npm install works when sharing the repo
        // to someone else, so including all dependencies is important.
        // TODO: figure out how to get it to not warn about imports from src files.
        severity: "warn",
        options: { ignore: "src" }
    },
    "no-import-side-effect": {
        // each import with a side effect should be noted what side effect is expected
        // only exception being css files which are obvious what they do.
        severity: "warn",
        options: { "ignore-module": "(\\.css)$" }
    },
    "no-parameter-reassignment": {
        // Usually reassigning parameters is a mistake so useful to note it happening.
        // usually doing `let myThing = param` at the beginning of the function makes the
        // intent with the variable clearer or
        // if reasigning is intended a comment along with tslint-disable is acceptable.
        severity: "warn"
    },
    forin: {
        // you probably meant to use for-of.
        // fine to disable and comment what you are actually iterating over.
        // most cases I'd prefer using for-of over Object.keys()
        severity: "warn"
    },
    "no-conditional-assignment": {
        // if(x = y) is super common typo, should be warned about.
        // I did wish there was a construct like swift's if-let statement
        // but using let or const inside an if is certainly not allowed.
        severity: "warn"
    },
    "no-object-literal-type-assertion": {
        // type assertion checks if any fields are incompatible types but allows missing fields.
        // as well if any unrecognized fields are passed they are labeled as issues which is preferable.
        severity: "warn"
    },
    "no-string-literal": {
        // I have mostly seen this as a work around for variables with incorrect type.
        // use the regular . attribute lookup and if that is not working because of types
        // then correct the type interfaces.  Because noImplicitAny is not enabled any
        // string key that is not present results in any being return value, which is nearly
        // always a problem. Leaving as warn because it has auto-fixer.
        severity: "warn"
    },
    deprecation: {
        // should try to avoid using deprecated things, or if you do need deprecated things then the
        // comment to disable this rule is a good placemark that the deprecation should be removed.
        severity: "warn"
    },

    //// wish there was an auto-fixer for.
    "unified-signatures": {
        // Using unions instead of overloads is great, although because this doesn't
        // have an auto-fixer and sometimes it isn't super obvious what to change
        // I will leave this as a warning
        severity: "warn"
    },
    "strict-boolean-expressions": {
        // https://github.com/palantir/tslint/issues/4671
        // UHHG, ignore-rhs makes it miss `if(x || y)` if y is not a boolean, but we need to enable ignore-rhs
        // or react `loaded && <div.../>` doesn't work.
        // stupid rule not doing the natural thing to do.
        severity: "warn",
        options: ["allow-boolean-or-undefined", "ignore-rhs"]
    },
    "no-this-assignment": {
        // code from external sources are expected to use this a lot
        // but using arrow functions is far more prefered when possible.
        severity: "warn"
    },
    "comment-type": {
        // would like to not use /* */ format because
        // usually this is intended to be a /** */ documentation
        // and was accidentally left out the second *
        severity: "warn",
        options: ["doc", "singleline", "directive"]
    },
    "increment-decrement": {
        // USE += INSTEAD OF ++
        // ++ is confusing, if you really are doing something where it makes for better code go ahead and disable
        // this rule for that line, it at least makes it clear that you are doing the incrementer.
        severity: "error",
        options: []
    },
    "class-name": {
        // I'd really like to have a complimentary to stop variables from using PascalCase
        // but I guess react function components need caps... idk.
        severity: "warn"
    },
    "return-undefined": {
        // If the only return statement returns undefined then the function basically represents a void function so it should just use "return"
        // otherwise "return" for void function or "return undefined" when a (possibly undefined) value is expected
        // this is nice for consistency and has a simple auto-fixer
        severity: "warn"
    },
    "variable-name": {
        // COMMENT
        severity: "warn",
        options: [
            // this is nice to not allow variables to use the same name as types or undefined etc.
            "ban-keywords",
            "check-format",
            // the only reason to put a variable in all caps is to define it as a hardcoded constant.
            "require-const-for-all-caps",
            // leading underscores are fine to label don't mess with this unless you are in the correct place (like private fields that should only be used inside a getter / setter)
            "allow-leading-underscore",
            // TODO: check if there is a good way to deal with React.forwardRef or similar for function components.
            "allow-pascal-case"
            // I don't like using trailing underscores, I'd rather do like `cls` than use `class_` etc.
        ]
    },
    "max-line-length": {
        // warning about really long lines is useful, prettier using this to format is more useful.
        severity: "warn",
        options: {
            limit: 140,
            // code that is really close to 140 which is commented out should still be allowed
            // if I could put a limit like 150 on comments that would be nice.
            "ignore-pattern": "//"
        }
    }
};
