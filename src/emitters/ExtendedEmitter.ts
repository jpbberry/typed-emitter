import { applyToEmitter } from '../utils/applyToEmitter'
import { eventMapper, EventMapperOptions } from '../utils/Decorators'

import { EventEmitter } from 'events'

export class ExtendedEmitter {
  [eventMapper]: EventMapperOptions[]

  constructor (emitter: EventEmitter) {
    applyToEmitter(emitter, this[eventMapper].map(x => ({ ...x, method: this[String(x.method)].bind(this) })))
  }
}
