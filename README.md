TadhgsLinter

This collection of js files is the result of me methodically going through all 157 supported tslint rule and including in here with appropriate warning level and comments on rational for why.

The only rules listed in https://palantir.github.io/tslint/rules/ that are not included somewhere in this are:

-   file-header
-   file-name-casing

because both were giving me warnings that the format was invalid, I will be looking at this and fixing.

Each catagory of linter rule is split into the seperate files, each one has a comment at the top describing how those set of rules are intended to be used

To use this put this repo in a folder called "tslint.json" (the file extension is needed to get tslint to import it as if it was the actual tslint.json file.)
