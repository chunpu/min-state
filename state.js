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
			}
		}
	}
}

proto.get = function() {
	return this.currentState
}

proto.setEvent = function(name, from, to) {
	var me = this
	var events = me.events
	var item = events[name]
	if (item) {
		item.from = from
		item.to = to
	} else {
		// new event
		events[name] = {
			from: from,
			to: to
		}
		me.on(name, function() {
			if (from == me.get()) {
				me.set(to)
			} else {
				me.emit('invalid', name)
			}
		})
	}
}

proto.setEvents = function(events) {
	var me = this
	_.forIn(events, function(item, name) {
		if (item) {
			me.setEvent(name, item.from, item.to)
		}
	})
}

function isStateMatch(pattern, state) {
	if (state == pattern || !pattern || '*' == pattern) return true
}
