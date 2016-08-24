var _ = require('min-util')
var Event = require('min-event')

module.exports = exports = State

function State(param) {
	var me = this
	Event.call(me)
	me.param = param = param || {}
	me.history = []
	if (param.start) {
		me.set(param.start)
	}
	me.events = {}
}

_.inherits(State, Event)

var proto = State.prototype

proto.is = function(state) {
	return state == this.get()
}

proto.set = function(state) {
	var me = this
	if (me.ended) return
	if (state) {
		var from = me.currentState
		if (state != from) {
			me.emit('exit', from)
			me.currentState = state
			me.emit('enter', state)
			me.history.push({
				time: _.now(),
				state: state
			})
			// last trigger
			me.emit('statechange', {
				from: from,
				to: state
			})
			if (me.param.end == state) {
				me.ended = true
				me.emit('end', state)
			}
		}
	}
}

proto.get = function() {
	return this.currentState
}

proto.can = function(event) {
	var me = this
	var item = me.events[event]
	if (item) {
		if (isStateMatch(item.from, me.get())) {
			return true
		}
	}
	return false
}

proto.setEvent = function(event, from, to) {
	var me = this
	var events = me.events
	var item = events[event]
	if (item) {
		item.from = from
		item.to = to
	} else {
		// new event
		events[event] = {
			from: from,
			to: to
		}
		me.on(event, function() {
			// get item real time because it can be overwrite
			if (me.can(event)) {
				// then it has event
				me.set(me.events[event].to)
			}
		})
	}
}

proto.setEvents = function(events) {
	var me = this
	_.forIn(events, function(item, event) {
		if (item) {
			me.setEvent(event, item.from, item.to)
		}
	})
}

function isStateMatch(pattern, state) {
	if (state == pattern || !pattern || '*' == pattern) return true
}
