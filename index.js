/*
index tslint module.
this should be placed in a folder called "tslint.json" along with other
tslint rulesets inside a project.
*/
exports.extends = [
    "tslint-react-hooks",
    "./strict",
    "./recommend",
    "./fixers",
    "./overridable",
    "./todo",
    "./nonop"
];
exports.rules = {
    "react-hooks-nesting": {
        severity: "error"
    }
};
exports.jsRules = {
    "object-literal-key-quotes": {
        // Will let the auto-fixer add quotes to keys, this seems fine.
        // makes it much easier to differentiate with methods and shorthand unpacking, also makes it closer to JSON.
        severity: "error",
        options: "always"
    }
};
