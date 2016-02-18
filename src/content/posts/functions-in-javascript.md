---
title: "Functions in JavaScript"
date: 2014-10-14
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

Some general notes on functions, some of which only applicable to JavaScript.

### Free Variables

A free variable is not bound within a function in which it is used. It is not declared within the function or passed in as a parameter, but is still used within the function:

    var x = 1;
    function (y) {
        return x; // x here is a free variable
    }

###Pure Functions

A function containing no free variables is a pure function. A pure function can contain a closure.

###Closures (Lexical Scoping)

A closure is a function that closes over the variables of another function. A closure is a function that captures the external bindings contained in the scope in which it was defined for later use - even after the scope has completed. A closure is an inner function that has access to the variables of the outer function even after it returns.

Closures can be used to guard against global namespace pollution, as an API for interacting with private bindings, or to reuse variables without having to reinstatuate them each time the function is called.

###Higher Order Functions

A higher order function is a function that takes a function as an argument and/or returns a function.

###Combinators

A combinator is a higher order function that only use functions and other combinators to define a result from it's arguments.

###Invoking Functions

There are 4 ways to invoke functions, method form, function form, constructor form and apply form. The form in which you call a function determines the value of 'this'.

    // Method Form
    anObject.methodName(args); // either this way
    anObject[methodName](args); // or this way

_this_ is set to the object calling the method (anObject in the example above).

    // Function form
    functionObject(args);

_this_ is set to the global object in ES3 or undefined in ES5 strict.

    // Contructor form
    new FunctionValue(args);

A new object is created and assigned to _this_.

    // Apply form
    functionObject.apply(thisObject, args); // either this way
    functionObject.call(thisObject, args); // or this way

_this_ is passed in explicitly (thisObject in the examples above). 
