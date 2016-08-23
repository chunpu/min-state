min-state
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]
[npm-image]: https://img.shields.io/npm/v/min-state.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-state
[downloads-image]: http://img.shields.io/npm/dm/min-state.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-state
[david-image]: http://img.shields.io/david/chunpu/min-state.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/min-state


Simple finite state machine library for javascript

Installation
---

```sh
npm i min-state
```

Api
---

Constructor

```js
var state = new State({
	start: 'idle', // default state name
	end: 'ended' // if set, can never be set again
})
```

method

- `state.is(stateName)` return true if current state name is val
- `state.set(stateName)` set state current state
- `state.get()` get state current state
- `state.setEvent(stateName, from, to)` set event which can only transition from stateA to stateB
- `state.setEvents({stateName: {from: stateA, to: stateB}})` multiply set event

> use '*' for from which can transition from any state

events

- `enter, state`
- `exit, state`
- `statechange, {from: stateA, to: stateB}`
- `invalid, eventName`

example

check `example.js` for example

License
---

[![License][license-image]][license-url]

[license-image]: http://img.shields.io/npm/l/min-state.svg?style=flat-square
[license-url]: #
