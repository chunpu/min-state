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
