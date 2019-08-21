/*
This contains rules that are useful mainly just for the fixer behaviour
things for organization or maintainability and nothing affects functionality.
*/
exports.rules = {
    //// error rules
    // these rules correct things that are problematic enough that
    // they are labeled as errors if left.
    curly: {
        // same line is ok - mostly because other libraries that do that is easier to import
        // but in general should always be using curly braces.
        severity: "error",
        options: "ignore-same-line"
    },
    "linebreak-style": {
        // leave as unix style line breaks. screw windows and your typewriter style text files.
        severity: "error",
        options: "LF"
    },
    "trailing-comma": {
        // miltiline should always use trailing commas, git diff is always so frustrating when you get merge conflicts with people because you both
        // added a comma to the last property of an object literal.
        // mainly the auto-fixer knows how to remove a trailing comma if you comment out some properties, but doesn't know to add one back in when un-commenting
        // so leaving a trailing comma fixes that as well.
        severity: "error",
        options: {
            multiline: "always",
            singleline: "never",
            // why is this not default? the linter fixer adds a comma where typescript says one is not allowed without this flag!
            esSpecCompliant: true
        }
    },
    "new-parens": {
        // I hate that allowing no parenthasis is allowed in the first place, you are calling the constructor, write it like a function call!
        severity: "error"
    },
    "no-trailing-whitespace": {
        // I hate having trailing whitespace at the end of lines, this causing merge conflicts is rediculous.
        severity: "error",
        options: "ignore-blank-lines"
    },

    //// Organization
    "ordered-imports": {
        // TODO: can use the groups ordering to impose below mentioned stuff?
        // this is an awesome thing to have an auto-fixer for.
        // convension is to group imports like:
        // - imports from external modules or util stuff.
        // - imports from own project
        // - (possibly other groups of modules)
        // - css or json or html files
        // although with automatically added imports it is understandable if the last group is just a mix of everything.
        severity: "warn",
        options: {
            "named-imports-order": "case-insensitive",
            "import-sources-order": "case-insensitive",
            // TODO: revisit this and fix up groupings
            // with being able to refer to "components/A" directly it is hard to differentiate project imports vs node_module imports.
            // also add another group for relative imports probably, ones that use ./ or ../
            "grouped-imports": true,
            groups: [
                {
                    // imports consisting of only a single name possibly with dashes
                    name: "library",
                    match: "^[\\w-]+$",
                    order: 0
                },
                {
                    // imports from own library, need to set baseUrl: "." in tsconfig.json for src to be valid
                    name: "project wide",
                    match: "^src/",
                    order: 1
                },
                {
                    name: "relative imports",
                    match: "\\.{1,2}/",
                    order: 2
                },
                {
                    // importing css, html, json files for resources.
                    // should add sass files too possibly?
                    name: "resources",
                    match: "\\.(css|html|json)$",
                    order: 3
                }
                // anything that doesn't match any of the above (possibly submodules of library or different resources)
                // will be grouped together after all these.  Might want to update this definition to re-organize if needed.
            ]
        }
    },
    "object-literal-sort-keys": {
        // get the auto-fixer to sort keys to be same order as definition in interface.
        // this is nice for organization.
        severity: "warn",
        options: "match-declaration-order-only"
    },

    //// Whitespace and comments
    "space-before-function-paren": {
        // I personally don't like the space between function name and open parenthases
        // usually if the parameter list is long then I'd have the open parenthasis right after the name
        // and start the parameters on the next line.
        severity: "warn",
        options: {
            anonymous: "never",
            asyncArrow: "never",
            method: "never",
            named: "never"
        }
    },
    "comment-format": {
        // Auto-fixer to add space to comments is nice.
        severity: "warn",
        options: "check-space"
    },
    eofline: {
        // auto-fixer add a newline!
        severity: "warn"
    },
    "no-consecutive-blank-lines": {
        // some concecutive blank lines is useful, a whole page of empty space is silly.
        // I have arbitrarily set the threshold to 5, mostly because if I want to make 2 things very seperate during development
        // having the auto-fixer go down to 5 makes them still fairly far apart.
        severity: "warn",
        options: 5
    },
    "typedef-whitespace": {
        // auto-fixer is nice for formatting.
        severity: "warning",
        options: [
            {
                // specifies to the LEFT of the colon (before it)
                "call-signature": "nospace",
                "index-signature": "nospace",
                parameter: "nospace",
                "property-declaration": "nospace",
                "variable-declaration": "nospace"
            },
            {
                // specifies to the RIGHT of the colon (after it)
                "call-signature": "onespace",
                "index-signature": "onespace",
                parameter: "onespace",
                "property-declaration": "onespace",
                "variable-declaration": "onespace"
            }
        ]
    },
    whitespace: {
        // auto-fixer is nice, otherwise I wouldn't care very much.
        severity: "warn",
        options: [
            // "check-branch", // I like "if(x){}
            "check-decl",
            "check-operator",
            "check-module",
            "check-separator",
            "check-rest-spread",
            "check-type",
            "check-typecast",
            "check-type-operator"
            // "check-preblock",
            // "check-postbrace"
        ]
    },

    //// types
    "no-inferrable-types": {
        // auto-fixer will remove explicit type annotation when intiialized to a primitive literal.
        // in the case of consts like `const A = 5` the infered type of 5 is actually better than number.
        // If it applied to anything other than primitive literals I'd be against this rule.
        severity: "warn"
    },
    "no-unnecessary-type-assertion": {
        // using "as string" on a string variable is pointless etc.
        // auto-fixer will remove uneceesary casting.
        severity: "warn"
    },
    "callable-types": {
        // just use a function type instead of interface with only call signature
        // when there are multiple call signatures then interface is valid.
        severity: "warn"
    },
    "interface-over-type-literal": {
        // if you are defining a standalone type then use an interface
        // if you are using a throwaway type (to be used on only a few places) usually you can just intialize a varible
        // then do `type TYPE = typeof origVal` to get a reusable reference to the type.
        // either way, a type declaration as an object literal should be converted to an interface.
        severity: "warn"
    },

    //// Quotes and object literals
    "no-unnecessary-qualifier": {
        // this is that within a namespace or enum definition, references to other members of the namespace or enum don't need to be prefixed.
        // like, this is valid but restricted by this rule: `enum Things {a = 1, b = Things.a}` and the fixer changes the `b = Things.a` to just `b = a`
        severity: "warn"
    },
    // putting literal-shorthand before literal-key-quotes means it's fixer has priority
    // I have no idea if this just happens to work on my machine or if it is guarenteed, probably not since JSON doesn't have ordering here.
    "object-literal-shorthand": {
        // means that {a: a} will be auto-fixed to just {a} which is kind of nice, shorthand is usually prefered.
        severity: "warn"
    },
    "object-literal-key-quotes": {
        // Will let the auto-fixer add quotes to keys, this seems fine.
        // makes it much easier to differentiate with methods and shorthand unpacking, also makes it closer to JSON.
        severity: "warn",
        options: "always"
    },
    quotemark: {
        // don't use single quotes because you need double quotes for "don't" to be valid.
        // combined with object-literal-key-quotes this puts object literals very close to valid JSON
        severity: "warn",
        options: ["double", "jsx-double", "avoid-escape"]
    },
    "prefer-template": {
        // templates are superior in general
        severity: "warn"
    },

    //// general
    "no-return-await": {
        // It is totally valid to return a promise, await actually adds more overhead.
        // should just return the promise directly.
        // auto-fixer to just remove await is fine.
        severity: "warn"
    },
    "arrow-return-shorthand": {
        // expression arrow functions are great, just use them.
        // auto-fixer does no harm here.
        severity: "warn"
    },
    "no-unnecessary-callback-wrapper": {
        // functions can be passed around as variables, it can be easy to forget and simple wrappers can be removed.
        // wrappers that do (evt) => this.handleEvent(evt) are still fine because they use the reference to this.
        // I don't think this is needed, the bigger issue is that an enum key using the same name as a local variable
        // which falls under the shadowed variable rule domain but isn't caught by it.
        severity: "warn"
    },
    "no-boolean-literal-compare": {
        // x === true will always evaluate to the same value as just x.
        // so the auto-fixer just remvoes the === true and leaves x.
        severity: "warn"
    },
    "number-literal-format": {
        // this checks that ".5" is changed to "0.5" and checks that "0.50" is changed to "0.5"
        // the first part is great, the second part absolutely has cases that disabling this rule for it is fine.
        severity: "warn"
    },
    semicolon: {
        // I have read enough things explaining how things can go wrong if you don't use semicolons to be convinced it is useful.
        // but if there wasn't an auto-fixer I would have gone the other way and had no semicolons because screw that.
        severity: "warn",
        options: ["always", "ignore-interfaces"]
    }
};
