// TODO: require event emitter module
const EventEmitter = require('events')

// TODO: initiate emitter
const emitter = new EventEmitter()

// TODO: Register a listener
emitter.on('log', function(message='') {
  console.log('Listener called', message)
})

// TODO: Raise an event
// emitter.emit('log', 'hello')

// TODO: Build log system on the Class Person when greet method called
class Person extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
  }

  greet() {
    this.emit('log', `LOG: ${this.name} is greeting some one.`)
    console.log('Hello!')
  }
}

const jon = new Person('Jon Doe')
jon.on('log', (message) => console.log(message) )
jon.greet()