---
title: "Beautiful idiomatic Python"
date: 2014-01-25
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

Notes I made whilst watching (and rewatching) Raymond Hettinger's Pycon 2013 talk. (don't do this, do this)

Replace traditional index manipulation with Python’s core looping idioms.
Learn advanced techniques with for-else clauses and the two argument form of iter().
Clarify function calls with keyword arguments.
 
Tuple packing and unpacking
Don’t under‐estimate the advantages of updating state variables at the same time. It eliminates an entire class of errors due to out­of-order updates. It allows high level thinking: “chunking”.
 
Decorators and Context Managers
Helps separate business logic from administrative logic. Clean, beautiful tools for factoring code and improving code reuse. Good naming is essential.
 
Factor out temporary contexts by using "with" instead of "try/finally".
 
One logical line of code equals one sentence in English.

###Looping over a range of numbers

**Don't do this**

```
for i in [0, 1, 2, 3, 4, 5]:
    print i**2
```
 
**Do this**

```
for i in range(6):
    print i**2
```

###Looping over a collection

```
colors = ['red', 'green', 'blue', 'yellow']
```
 
**Don't do this**

```
for i in range(len(colors)):
    print colors[i]
```
 
**Do this instead**

```
for color in colors:
    print color
```
 
(Reversed)
**Don't do this**

```
for i in range(len(colors)-1, -1, -1):
    print colors[i]
```
 
**Do this instead**

```
for color in reversed(colors):
    print color
```

###Looping over a collection and indicies

**Don't do this**

```
for i in range(len(colors)):
    print i, '-->', colors[i]
```
 
**Do this instead**

```
for i, color in enumerate(colors):
    print i, '-->', color
```

###Looping over two collections

```
names = ['raymond', 'rachel', 'matthew']
colors = ['red', 'green', 'blue', 'yellow']
 
for name, color in izip(names, colors):
    print name, '-->', color
```
 
(Construct a dictionary from these pairs)

```
d = dict(izip(names, colors))
{'matthew': 'blue', 'rachel': 'green', 'raymond': 'red'}
 
d = dict(enumerate(names))
{0: 'raymond', 1: 'rachel', 2: 'matthew'}
```

###Looping in sorted order

```
colors = ['red', 'green', 'blue', 'yellow']
for color in sorted(colors):
    print color
 
for color in sorted(colors, reverse=True):
    print color
```

###Custom sort order

```
colors = ['red', 'green', 'blue', 'yellow']
```

**Don't do this**

```
def compare_length(c1, c2):
    if len(c1) < len(c2): return -1
    if len(c1) > len(c2): return 1
    return 0
 
print sorted(colors, cmp=compare_length)
```
 
**Do this**

```
print sorted(colors, key=len)
```
 
###Multiple exit points in loops

**Don't do this**

```
def find(seq, target):
    found = False
    for i, value in enumerate(seq):
        if value == tgt:
            found = True
            break
    if not found:
        return -1
    return i
```
 
**Do this**

```
def find(seq, target):
    for i, value in enumerate(seq):
        if value == tgt:
            break
        else:
            return -1
    return i

###Looping over dictionary keys

```
d = {'matthew': 'blue', 'rachel': 'green', 'raymond': 'red'}
```
 
**Don't do this**

```
for k in d:
    print k
```
 
**Or this**

```
for k in d.keys():
    if k.startswith('r'):
        del d[k]
```
 
**Do this**

```
d = {k : d[k] for k in d if not k.startswith('r')}
```

###Looping over a dictionary keys and values

**Don't do this**

```
for k in d:
    print k, '-->', d[k]
```
 
**Or this**

```
for k, v in d.items():
    print k, '-->', v
```
 
**Do this**

```
for k, v in d.iteritems():
    print k, '-->', v
```

###Counting with dictionaries

```
colors = ['red', 'green', 'red', 'blue', 'green', 'red']
```
 
**Don't do this**

```
d = {}
for color in colors:
    if color not in d:
        d[color] = 0
    d[color] += 1
 
{'blue': 1, 'green': 2, 'red': 3}
```
 
**Or this**

```
d = {}
for color in colors:
    d[color] = d.get(color, 0) + 1
```
 
**Do this**

```
d = defaultdict(int)
for color in colors:
    d[color] += 1
```

###List Comprehensions and Generator Expressions

**Don't do this**

```
result = []
for i in range(10):
    s = i ** 2
    result.append(s)
print sum(result)
```
 
**Do this**

```
print sum(i**2 for i in xrange(10))
```
 
###Unpacking sequences

```
p = 'Raymond', 'Hettinger', 0x30, 'python@example.com'
```
 
**Don't do this**

```
fname = p[0]
lname = p[1]
age = p[2]
email = p[3]
```
 
**Do this**

```
fname, lname, age, email = p
```

###Updating multiple state variables

**Don't do this**

```
def fibonacci(n):
    x = 0
    y = 1
    for i in range(n):
        print x
        t = y
        y = x + y
        x = t
```
 
**Do this**

```
def fibonacci(n):
    x, y = 0, 1
    for i in range(n):
        print x
        x, y = y, x+y
```

###References
https://www.youtube.com/watch?v=OSGv2VnC0go
