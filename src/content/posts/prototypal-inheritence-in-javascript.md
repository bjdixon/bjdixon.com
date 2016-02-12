---
title: "Prototypal inheritence in JavaScript"
date: 2014-09-03
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

Objects are bags of properties (own properties). Each object has a link to a prototype object. 

A prototype is a property of functions and objects that are created by constructor functions. 

When an inherited function is executed 'this' points to the inheriting object, not the prototype object: 

```
var o = { a:2, m:function() {return this.a + 1;} };
console.log(o.m()); // 3
var p = Object.create(o);
p.a = 12;
console.log(p.m()); // 13 
```

The prototype of a function is an object. It's main use is when a function is used as a constructor:

```
function Vehicle (wheels, engine) {
    this.wheels = wheels;
    this.engine = engine;
}
```

The prototype of the Vehicle function is the prototype of any object that is instantiated with the Vehicle constructor:

```
var testVehicle = new Vehicle(2, false);
```

The prototype property can be used to add properties and methods to objects even after instantiation:

```
var testCar = new Vehicle(4, "V8");
Vehicle.prototype.color = "red";
console.log(testCar.color); // "red"
```

The prototype object can be used to derive one object from another with Object.create:

```
var Bicycle = Object.create(Object.getPrototypeOf(Vehicle), { "pedals": { value:true } });
```

The Bicycle object has the properties wheels, engine, color and pedals. It's prototype is Vehicle.prototype. The JavaScript engine finds the pedals property on Bicycle and looks up the prototype chain to find the wheels, engine and color properties on Vehicle.

###The inheritence chain

Objects can be created using syntax constructs, by calling a constructor function, or by calling Object.create():

```
var o = { a:1 }; // syntax construct

function Coords(x, y) {
 this.x = x;
 this.y = y;
}
var c = new Coords(5, 5); // calling a constructor function 

var b = Object.create(o); // calling Object.create()
```

o inherits Object.prototype and Object.prototype has null as it's prototype.

c is an object with own properties x and y. 

b inherits from o which inherits from Object.prototype which inherits from null.

```
a = [1, 2];
```

a's prototype chain looks like this: a -> Array.prototype -> Object.prototype -> null

```
function f() { return 1; }
```

f's prototype chain looks like this: f -> Function.prototype -> Object.prototype -> null
