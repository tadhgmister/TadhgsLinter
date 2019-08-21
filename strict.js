/*
rules in this file I am fairly passionate about
If you get warnings or errors from a rule in this file you should
not disable it or change the rule but instead fix your code.
*/
exports.rules = {
    //// rules to ensure the basic sanity of the project
    "no-duplicate-super": {
        // why on earth is this not caught at compile time? it is totally invalid at runtime!
        severity: "error"
    },
    "function-constructor": {
        // Function() constructor takes in a string and will evaluate it
        // why would you ever need that in production code?
        severity: "error",
        options: []
    },
    "no-arg": {
        // arguments.callee seems like it is inteded to give anon functions references to itself
        // this is stupid, just write a function with a name right above and refer to that name in the function
        // avoid anon functions.
        severity: "error"
    },
    "no-restricted-globals": {
        // rule should really be called "restricted-globals" but anyway..
        // as of typescript 3.5 the global "name" which is not suppose to be used ever is type "never"
        // which means it is assignable to anything making it extremely hard to realize that you accidentally used it.
        // also "length" is apparently a global, will restrict that too.
        // "event" (which is the 3rd default) is omitted because it is labeled as deprecated so it is caught by the no-deprecation flag.
        severity: "error",
        options: ["name", "length"]
    },
    encoding: {
        // uft-8. Mostly this isn't an issue and if it is I don't want the thing to compile.
        severity: "error"
    },
    "no-angle-bracket-type-assertion": {
        // screws up tsx, should just always use "as type" instead.
        severity: "error"
    },
    //// methods and declarations
    "adjacent-overload-signatures": {
        // when overloads are not adjacent it is really easy to not realize they are overloads.
        severity: "error"
    },
    "member-access": {
        // rather be explicit about visibility.
        // should always use 'public', 'protected' or 'private' to note what visibility you want.
        severity: "error",
        // not using "check-constructor" here because constructor is expected to be public.
        options: ["check-accessor", "check-parameter-property"]
    },
    //// Promise

    "promise-function-async": {
        // should always mark function that intends to return a promise as async, although it is very easy
        // to end up with this mid-refactoring so we won't enforce it as error.
        // as well in the case that one function becomes async and other functions chain effect also need to be labeled as async
        // is a case that this would not be desirable to change
        severity: "warn"
    },
    "no-async-without-await": {
        // compliments promise-function-async
        // during refactoring this can point out functions that are no longer needed to be async.
        // if a large section switches from needing to be async to not being async or vice versa
        // warnings will indicate what functions are mislabeled.
        // if this becomes annoying it might make sense to just disable this in general.
        severity: "warn"
    },
    "await-promise": {
        // await on a union of promises and non promises is totally valid and allowed by this rule
        // any time you await something that is known to not be a promise is surely a mistake.
        severity: "error"
    },
    "no-floating-promises": {
        // you can add "void" before promise to ignore this rule,
        // as long as void is the first word on the line it is easy to find all occurences.
        // however in nearly every case you want to actually handle the promise so leaving this as a waring during
        // development means you get a pointer back to handle it later.
        severity: "warn"
    },

    //// switch statements
    "no-duplicate-switch-case": {
        // technically expressions that evaluate to different values like next iterator value
        // might make sense to check twice, but a tslint-disable should be added if that is actual
        // intent, pretty much all expected cases should not be checking the same value twice.
        severity: "error"
    },
    "no-switch-case-fall-through": {
        // While technically valid, fall throughs are really easy to misinterpret.
        // I frequently find that I forget a break and even if missing the break is intentional
        // I almost always don't understand what goes wrong when it runs.
        severity: "error"
    },
    "switch-default": {
        // Pretty much every switch statement is for a union of known members or enum.
        // in those cases you should always be doing exaustiveErrorCase in the default.
        // otherwise always having a default is a really good idea, it makes you consider what should happen
        // even if it's just putting a comment for why you don't need a default case.
        severity: "error"
    },
    "switch-final-break": {
        // I'd love to set this up so that it warns if present on a default case but error if there is one missing from non default.
        // since the switch-default rule enforces always using a default case this rule will only affect default cases (unless that is overriden)
        // so we will jsut say warn if a break is used in a default. I imagine it might be intended to break out of loop instead?
        severity: "warn"
    },

    //// loops
    "prefer-for-of": {
        // for of is superior in every way. Use iterators!
        severity: "error"
    },
    "no-for-in-array": {
        // just use array.entries() and a for-of loop:
        // for (const [index, value] of array.entries()) { }
        severity: "error"
    },
    "prefer-while": true,

    //// checks
    "triple-equals": {
        // just about the only thing that I'd expect from "loose equals" is some sort of floating point consideration
        // and that isn't even done. Just use triple equals to compare everything, just do == null to check for either null or undefined.
        severity: "error",
        options: "allow-null-check"
    },
    "strict-comparisons": {
        // checking {} < {} for objects always returns false, this is confusing.
        // so lets not do it.
        severity: "error",
        options: {
            // check if objects are same reference, this is fine.
            "allow-object-equal-comparison": true,
            // let strings be compared, usually context makes the intent obvious.
            "allow-string-order-comparison": true
        }
    },
    "use-isnan": {
        // checking x === NaN is always false but typescript won't make a special handling just for this.
        // so it is up to the linter to tell you you need to use isNaN instead of === NaN
        severity: "error"
    },
    "no-tautology-expression": {
        // this rule only seems to catch obviously wrong statements like comparing a variable against itself
        // type narrowing is not affected by this rule so the only cases where a tautology is expected
        // isn't restricted by this rule. totally redundant conditions should never be used.
        severity: "error"
    },

    //// Formatting
    indent: {
        // keep your code indented to 4.
        // this is here and not in the Fixers.json because this
        // only enforces using spaces instead of tabs, the 4 is only used in the
        // auto-fix to replace tabs, this rules doesn't actually enforce using 4 spaces.
        severity: "error",
        options: ["spaces", 4]
    },
    "no-mergeable-namespace": {
        // will give error similar to declaring a class multiple times or variable.
        // technically interfaces can have multiple declarations whcih get merged,
        // I don't like that, especially it allows overloads to be split across several interfaces!
        severity: "error"
    },
    "no-parameter-properties": {
        // while I like the idea of parameter properties, they are:
        // - aren't very clean to write and make it harder to read the constructor call signature,
        //   - especially when mixed with non parameter properties.
        // - Can't be documented, and public fields should always be documented
        // - either super confusing or not possible with multiple constructor overloads.
        // and in all these cases the solution is to refactor to not use parameter properties, so we should just not use them to begin with.
        severity: "error"
    },
    "one-variable-per-declaration": {
        // the prefer-const rule should be applied to every variable seperately.
        // so every variable should be seperated. This helps with readability and with added type definitions it isn't very reusable to chunk initializations together.
        severity: "error",
        options: "ignore-for-loop"
    },

    //// General
    "no-unsafe-finally": {
        // return statement inside finally can override return from try
        // throw statement inside finally can override another error from try or catch
        // continue or break can cancel a return statement or suppress error rethrown in catch
        // these are not intuitive behaviour and should be avoided.
        severity: "error"
    },
    "ban-comma-operator": {
        // I hate the comma operator, it is so easy to misunderstand.
        // several times I have had a function that was suppose to return a list of things
        // but used round parenthases instead and a return value of only one element was valid where it was being used.
        // so typescript was totally happy with discarding all other elements of the suppose-to-be list.
        // don't use the comma operator.
        severity: "error"
    },
    radix: {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
        // " If the input string begins with "0" (a zero), radix is assumed to be 8 (octal) or 10 (decimal).
        //    Exactly which radix is chosen is implementation-dependent.
        //    ECMAScript 5 clarifies that 10 (decimal) should be used, but not all browsers support this yet.
        //    For this reason always specify a radix when using parseInt. "
        severity: "error"
    },
    "no-string-throw": {
        // should never be throwing plain string errors.
        severity: "error"
    }
};
