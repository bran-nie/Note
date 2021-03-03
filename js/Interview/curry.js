function createCurry(func, ...args) {
    var argity = func.length;
    console.log({ argity });
    return function (...newArgs) {
        args.push(...newArgs);

        if (args.length < argity) {
            return createCurry.call(this, func, args);
        }
        return func.apply(this, args);
    };
}

function add(a, b) {
    return a + b;
}

let addCurry = createCurry(add);
