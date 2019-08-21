/*
these rules are either not enabled because I don't think it makes sense
or only applicable to legacy stuff that I don't expect to ever run into.
So these rules aren't expected to affect anything in actual project.

They are here for completeness, every rule available in tslint is present in one of the files so this
is the file for rules that aren't used or not important.
*/
exports.rules = {
    ////// don't like the rule
    "no-unnecessary-initializer": {
        // I want the oposite rule, always explicitly initialize variables! even if it is to undefined.
        severity: "off"
    },
    "ban-ts-ignore": {
        // ts ignore is easy to search for, and using tslint: disable to allow ignoring ts errors
        // would be very silly.
        severity: "off"
    },
    "no-any": {
        // the ability to use any at least during development is critical
        // and since searching for uses of any is trivial when trying to cleanup typesafety
        // this rule isn't really useful at all.
        severity: "off"
    },
    "no-non-null-assertion": {
        // non-null assertions are useful to get around type-safety problems that don't have obvious solutions
        // those cases need a ! post fix and I expect a comment why it is known that it is non null and why
        // typescript doesn't know it, a third part as tslint-disable feels like overkill.
        severity: "off"
    },
    "only-arrow-functions": {
        // this is a terrible rule, `function doThings(){}` is much nicer to read than `const doThings = ()=>{}`
        severity: "off"
    },
    "label-position": {
        // This almost never is done accidentally, putting a label on a statement to
        // break out of it for several conditions inside seems fine to me.
        // I have frequently done similar to be able to return early for similar reasons, using break is fine as well.
        severity: "off"
    },
    "no-null-keyword": {
        // null is totally valid, when dealing with libraries that treat null and undefined differently
        // it is really important to have the difference.
        // TODO: how to specify internal consistency within a project?
        severity: "off"
    },
    "no-unsafe-any": {
        // this rule completely defeats the purpose of using any
        // should be using unknown when the data type isn't known.
        // generally should avoid using any but when you do it should be allowed to bypass typescript.
        severity: "off"
    },
    "restrict-plus-operands": {
        // this makes adding variables of type any throw warnings which defeats the purpose of any.
        // prefer-template fixes the original intent of this rule.
        severity: "off"
    },
    "static-this": {
        // type safety correctly checks what this is refering to inside a static method.
        // allowing sub-classes to override static methods to affect other static methods requires using this in static methods
        // not common use case, but when you use it it is usually pretty obvious you are using 'this' to accomplish it.
        severity: "off"
    },
    "unnecessary-constructor": {
        // templates that contain an empty constructor are useful.  Already use the no-empty rule to complain
        // if the constructor was completely blank, so I see no reason to treat this any different.
        severity: "off"
    },
    "use-default-type-parameter": {
        // if the definition "type P<A = string>" then using it like "P<string>" would get this rule to flag as issue
        // because you should just use the default.
        // I don't see any benefit of this, you are just being more explicit in your code and if the default changes later some places that don't care
        // will react differently than the places where the default was explicitly the one that needed to be used.
        severity: "off"
    },
    "max-classes-per-file": {
        // number of classes highly depends on what the purpose of the file is.
        // I don't think I could attach a number here that would be applicable to all cases
        severity: "off"
    },
    "array-type": {
        // using Array<T> vs T[] is very contextual
        // I'd rather use Array<Array<T>> than T[][]
        // and array-simple would recommend Array<T[]>
        // which seems silly.
        severity: "off",
        options: "array-simple"
    },
    "binary-expression-operand-order": {
        // 1 + x vs x + 1
        // why does it matter?
        severity: "off"
    },
    "interface-name": {
        // prefixing with I is silly (it only exists in type context, why does it need an additional prefix?),
        // and an interface called Incrementer would fail with the rule "never-prefix"
        // so will disable this.
        severity: "off"
    },
    "newline-per-chained-call": {
        // Prettier makes a good call on this, will let that sort this out.
        severity: "off"
    },
    "no-redundant-jsdoc": {
        // I refuse to ever prevent adding documentation, even if it does duplicate typescript stuff.
        severity: "off"
    },
    "one-line": {
        // I actually find that putting the else on the line after the close brace makes it easier to comment out.
        // so don't plan to ever enable this, prettier usualy does this anyway.
        severity: "off"
    },
    "prefer-function-over-method": {
        // while the principle of this rule is good, this is the kind of thing that would need to be incorperated during refactoring instead of
        // a general linter rule, otherwise any time you are rewriting some code the same method might end up being converted into and out of a method
        // several times which is rediculous.
        severity: "off"
    },
    "prefer-method-signature": {
        // There is a technical difference between foo(): void and foo: ()=>void, the first assumes that bind will expect an instance of the interface as the this argument.
        // because of that this rule is wrong. both forms are good. (not to mention it doesn't provide the option to go the other way.)
        severity: "off"
    },
    "prefer-switch": {
        // I don't actually prefer switches, chained if statements are just as clear to me. This might make sense to check during refactoring but
        // in general an if chain might switch between being only checking one variable to possibly checking other things as well.
        // so being told to use a switch to then need to convert back would be rediculous.
        severity: "off"
    },
    "unnecessary-else": {
        // depends on circumstances, during refactoring this might be necessary or not.
        // sometimes for something very short like one line in the if and one line in else I like leaving the else.
        // but other cases, particularly when it gets nested, the else is not welcome.
        severity: "off"
    },
    align: {
        // will leave this to every formatter ever, I don't need tslint to complain about which things must be aligned.
        severity: "off"
    },
    "arrow-parens": {
        // one argument without explicit type annotation means we don't need parenthasis.
        // if we add a second argument or need a type annotation we add the parenthasis.
        // for use in things like Array.map() and similar this is nice to not need the parenthases.
        severity: "off"
    },
    "newline-before-return": {
        // no I don't see the benefit of forcing a blank line before a return
        // usually the change in color of the return statement is enough for me.
        severity: "off"
    },

    ///// not applicable
    // some of these are just not possible because using a library breaks it
    // some are for legacy syntaxes that I don't expect to ever be a problem
    "no-null-undefined-union": {
        // unfortunately, this can't be configured to only complain about explicit types.
        // React.ReactNode gets complained about because it has undefined | null so this rule
        // is basically unusable
        severity: "off"
    },
    "no-misused-new": {
        // this prevents defining new call signature in an interface.
        // the interface to describe a react class component requires this
        // technically you can do "declare abstract class" but that is a silly inconnsistency
        // so I don't se
        severity: "off"
    },
    "ban-types": {
        // I don't see why any types should be banned from use,
        // String has it's uses and Object vs {} doesn't make a big deal to me.
        severity: "off"
    },
    "no-invalid-this": {
        // typescript strict-this flag already handles this. Don't need extra warning.
        severity: "off"
    },
    "import-blacklist": {
        // can be useful for ensuring sub-modules aren't loaded.
        // however this seems like a better job for post-development analysis.
        severity: "off"
    },
    "no-submodule-imports": {
        // this seems like a direct opposite intent as import-blacklist
        severity: "off"
    },
    "typeof-compare": {
        // deprecated, typeof used to return type 'string' so could compare to any string
        // now returns a union of the actual strings that typeof returns, so typescript itself checks that you are
        // checking against correct values.
        severity: "none"
    },
    /// LEGACY IMPORT STUFF
    // just use regular import statements and you will be fine.
    "no-internal-module": {
        // legacy thing, use namespace instead.
        severity: "error"
    },
    "no-namespace": {
        // instead of having one file with several internal modules,
        // just write each module in a seperate file, seems easy enough to deal with.
        severity: "error",
        // "declare module" to describe external module that is in plain javascript is still fine.
        options: "allow-declarations"
    },
    "no-reference": {
        // This is disallowing a legacy import mechanic, use module imports instead.
        severity: "error"
    },
    "no-var-requires": {
        // Use normal import syntax instead.
        severity: "error"
    },
    "no-require-imports": {
        // always use import keyword, not require.
        severity: "error"
    },
    "no-reference-import": {
        // seems like legacy import mechanics, will not allow.
        severity: "default"
    },

    //// Would only use if they had auto-fixer
    // these really should have fixers and aren't important enough
    // to complain about.
    "jsdoc-format": {
        // I so wish this had an auto-fixer! It is just for adding asterisks and whitespace!
        // Will leave this off just so people are not driven away from writing documentation.
        // TODO: find a better fix for this.
        severity: "off"
    },
    "prefer-conditional-expression": {
        // TODO: if this had an auto-fix I might consider, I'm mostly fine with condition chain to intialize a variable.
        severity: "off"
    },
    typedef: {
        // WOULD LIKE TO ONLY FORCE IMPLICIT ANY ON PUBLIC FIELDS TO HAVE TYPE-DEFS
        // this rule can't take into account if a type can be validly inferred for any given
        // position, so nearly every setting for this rule ends up breaking some desirable implicit typing.
        // I'd really like to force type definitions only on exported or public variables / functions.
        severity: "off"
    }
};
