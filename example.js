var State = require('./')

var state = new State({
	start: 'idle',
	end: 'ended'
})

state.setEvents({
	play: {
		from: 'loaded',
		to: 'playing'
	},
	stop: {
		from: '*',
		to: 'ended'
	}
})

state.on('invalid', function(e) {
	console.log('invalid', e)
})

state.on('statechange', function(e) {
	console.log('state change', e)
})

state.on('enter', function(e) {
	console.log('enter', e)
})

state.on('exit', function(e) {
	console.log('exit', e)
})

state.on('end', function() {
	console.log('state machine finished')
})

setTimeout(function() {
	state.set('loading')
	state.emit('play') // should fail
	console.log('can play', state.can('play'))
	setTimeout(function() {
		state.set('loaded')
		console.log('can play', state.can('play'))
		setTimeout(function() {
			state.emit('play')
			setTimeout(function() {
				state.set('ended')
				console.log(state.history)
				state.set('idle') // should fail
			}, 100)
		})
	}, 200)
}, 100)
