# typed-emitter

Typed emitter providing fully typed methods of the base EventEmitter class

## Installation

To install run `npm i @jpbberry/typed-emitter`

## Usage

To use the typed-emitter, you can do so like

```ts
import { EventEmitter } from '@jpbberry/typed-emitter'

// a type
interface MyInterface {
  hello: boolean
}

// a class that you want to have typed emitters for
class MyClass extends EventEmitter<{ hello: MyInterface }> { // generic type has the map of events
  // this will then make all the methods have proper typings for the hello event and it's type
  run () {
    this.emit('hello', /* Will be typed as MyInterface */ { hello: true })

    // this will error for example
    this.emit('hello', { hello: 'world!' })
  }
}

const my = new MyClass()

my.on('hello', (data) => { // will be typed as MyInterface
  data.hello // typed as boolean
})
```

## Adding multiple arguments

You can add multiple arguments by defining the property of the event to be an array, this will be spread as properties for the listener function etc.

For example

```ts
class MyClass extends EventEmitter<{ hello: [boolean, string] }> {
  run () {
    this.emit('hello', true, 'world!') // now the passed data will boolean, string
  }
}

const my = new MyClass()
my.on('hello', (one, two) => {
  one // boolean
  two // string
})
```

*Defining an array as something passed to the event just has to be a nested array like `{ hello: [string[]] }`*

## Decorators

As this simply amazing new TypeScript feature begins to gain traction, this library now has support for decorators

Our decorators are `@Event` and `@Once`

You use these by simply defining them in an extending EventEmitter class and passing your event name to them like `@Event('message')`

Here's an example
```ts
import { EventEmitter, Event, Once } from '@jpbberry/typed-emitter'

class MyClass extends EventEmitter<{ MESSAGE: string }> {
  // You can now simply just use the event decorator above any method you want ran on that event
  @Event('MESSAGE') // Listening to the event MESSAGE
  receivedMessage (message: string) { // the name of the method does NOT matter at all
    console.log(message) // logs the paramater!
  }
}

const my = new MyClass()
my.emit('MESSAGE', 'Hello world!') // logs "Hello world!"
```

*Note you must enable `experimentalDecorators` in your tsconfig for these to work*

### ExtendedEmitter

This library also comes with an ExtendedEmitter for when a developer has made an emitter unavailable to you to extend / overwrite.

It allows you to use the decorators and all the features of the typed emitter while not having full control of the origin emitter

For example
```ts
import { ExtendedEmitter } from '@jpbberry/typed-emitter'

class MyOverrides extends ExtendedEmitter {
  @Event('message') // same concept as before!
  onMessage (message: Message) {
    message.channel.send('Hello world!')
  }
}

// Now we just instantiate with the previous emitter
const client = new Client() // this uses the default emitter

new MyOverrides(client) // this adds all of the events that were previously defined via the decorators
```

You can also use the `applyToEmitter` function if you want to use your own emitting options.