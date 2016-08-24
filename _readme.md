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
- `state.can(eventName)` return true if current state can trigger this event
- `state.setEvent(stateName, from, to)` set event which can only transition from stateA to stateB
- `state.setEvents({stateName: {from: stateA, to: stateB}})` multiply set event

> use '*' for from which can transition from any state

events

- `enter, state` enter this state
- `exit, state` exit this state
- `end, state` state machine end
- `statechange, {from: stateA, to: stateB}` state change
- `invalid, eventName` invalid event trigger

example

check `example.js` for example
