/*
This contains rules that I want to modify/improve
before using them as is.

as well as rules that I didn't fully understand so
left as default error level, should revisit these once 
they give errors in actual cases.
*/
exports.rules = {
    //// Need to look at
    "completed-docs": {
        // TODO: THIS RULE DOESN'T SEEM TO WORK
        // everything that is exported or public should have
        // some kind of documentation string.
        severity: "error",
        options: {
            // properties and methods can be overrides from super methods
            // like render for react will inherit the description from react if none is given.
            // "properties": {"privacies": "public"},
            // "methods": {"privacies": "public"},
            classes: { visibilities: "exported" },
            functions: { visibilities: "exported" },
            "enum-members": { visibilities: "exported" },
            enum: { visibilities: "exported" },
            interfaces: { visibilities: "exported" }
        }
    },
    "no-unbound-method": {
        // Can't find a decent way to handle this, if a field is already bound
        // then this doesn't know that....
        severity: "off"
    },
    "member-ordering": {
        // too many options for member ordering,
        // I'd rather figure out the desirable ordering based on logical grouping than on accessor
        // especially because arrow properties and methods are treated with different ordering rules.
        severity: "off"
    },
    "no-console": {
        // TODO: move this to recommend under ban then actually make the utils.console.
        severity: "error"
    },

    //// default imports
    // React.lazy only officially supports default exports (although using another field is trivial)
    // also cases I expect to use default exports is when the file is setup to only export one
    // variable and it's name is bascially expected to be the file name.
    // so I'd like to make a rule which forces default imports to be named the same
    // as the file name.
    "no-default-export": {
        // default exports are useful for React.lazy without needing a seperate loader to change a named field to a default one.
        // also anonomous default exports are decent for things like MakeUnionReducer for redux, we know the file will export a reducer
        // and we don't necessarily have any better name for it other than "reducer" and the name it gets imported as denotes the name that gets into
        // the redux state, so default export is really helpful for cases like that.
        severity: "none"
    },
    "no-default-import": {
        // TODO: write my own rule that forces the default import to have the same name as the file it was imported from.
        // default exports are only useful for either React.lazy in which case this rule doesn't apply,
        // or when the default export is anonymous and we want the name we import as to give it the significance.
        // in which case the anon-default export should match to the file name.
        severity: "none"
    },
    "match-default-export-name": {
        // Why can't I inforce this to import as name based on the file! I mainly use default exports as anonamous
        // which this rule can't cope with. I'd want it to be imported based on the file name!
        severity: "off"
    },

    //// Style
    "type-literal-delimiter": {
        // I WANT IT TO BE COMMAS !!!!
        severity: "off"
    },
    //// Format
    "import-spacing": {
        // "Ensures proper spacing between import statement keywords"
        // doesn't have auto-fixer, doesn't have description of what "proper spacing" is.
        // I'm sure there are better ways of dealing with this...
        // TODO actually check what this does.
        severity: "off"
    },

    //// didn't consider
    // these rules are set to default level because I wasn't sure what they affect
    // will need to see what it affects then deal with it accordingly
    "unnecessary-bind": {
        // not clear on what this affects, will need to see it in action.
        severity: "default"
    },
    "no-inferred-empty-object-type": {
        // this is probably either no longer applicable or complains when unknown is infered which is useful.
        // probably will disable once investigated.
        severity: "default"
    },
    "no-unnecessary-class": {
        // COMMENT
        severity: "default",
        options: []
    },
    "strict-type-predicates": {
        // TODO: figure out if this is useful or annoying.
        // might block exaustive checks or might catch tautologies.
        severity: "default"
    },
    "space-within-parens": {
        // TODO come back to this, want to actually play with it to decide what I want.
        severity: "default",
        options: [0]
    },
    "no-irregular-whitespace": {
        // TODO: what the heck does this rule do?
        severity: "default"
    }
};
