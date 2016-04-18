# babel-plugin-nofn [![npm version](https://badge.fury.io/js/babel-plugin-nofn.svg)](https://badge.fury.io/js/babel-plugin-nofn)

> Experimental Babel plugin which takes function call and transpiles it to inline code.

![](http://risovach.ru/thumb/upload/240c240/2012/12/generator/chyo_7217242_orig_.jpeg)

```
npm i --save-dev babel-plugin-nofn
```

The plugin converts function calls like:

```js
nofn.forEach(arr, (value, index) => {
	doSomething(value, index);
});
```

To something like this:
```js
for (var target = arr, index = 0, value, l = target.length; value = target[index], index < l; index++) {
	doSomething(value, index);
}
```

Which can be converted via minifier into this:
```js
for(var b=arr,a=0,c,d=b.length;c=b[a],a<d;a++)doSomething(c,a)}
```

Versus:
```js
c.forEach(d,function(a,b){doSomething(a,b)});
```

Where ``nofn`` is "meta variable" name (kind of "label" for converter). If you need "real" ``nofn`` library (for development purposes), look at the **/lib/** folder.


## Goals
- High performance for general tasks
- No dependencies
- "Sugared" function-call-like syntax

## API
Since this is very new version, the number of implemented functions is very small.
- ``nofn.forEach(arrayLike, callback(value, index))`` - iterates over array items
- ``nofn.forOwn(object, callback(value, key))`` - iterates over object props
- ``nofn.assign(target, source)`` - extends one object by another
- ``nofn.slice(arrayLike, start=0, end=length)`` - slices array

## Performance
![](http://i.imgur.com/EOUAIgQ.png)

In general the plugin shows very good performance results but some functions from lodash or fast.js can be little faster.

## Todo
- Moar functions
- Moar performance if possible
- Improve folder structure

## Current status
As described above, this is just experimental project. The usage is limited (for example ``nofn.assign`` accepts only two objects and ``nofn.slice`` doesn't accept negative indexes) and you may not get any profit using this plugin.
