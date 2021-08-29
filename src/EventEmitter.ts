import { EventEmitter as EM } from 'events'
import { eventMapper } from './Decorators'

interface MapType {
  [key: string]: any|any[]
}

type TypeToData <Value extends any[] | any> = Value extends any[] ? Value : [Value]

type Listener <Value extends any[] | any> = (...data: TypeToData<Value>) => void | any

export interface EventMapperOptions {
  event: string
  method: string
  type: 'on' | 'once'
}

export class EventEmitter<Map extends MapType> extends EM {
  [eventMapper]: EventMapperOptions[]

  constructor (opts?: ConstructorParameters<typeof EM>[0]) {
    super(opts)

    if (this[eventMapper]) {
      this[eventMapper].forEach(event => {
        this[event.type](event.event, this[event.method].bind(this))
      })
    }
  }


  eventNames: <K extends keyof Map>() => (K | symbol)[]

  on: <K extends keyof Map>(event: symbol | K, listener?: Listener<Map[K]>) => this
  addListener: <K extends keyof Map>(event: symbol | K, listener?: Listener<Map[K]>) => this
  
  once: <K extends keyof Map>(event: K | symbol, listener?: Listener<Map[K]>) => this
  
  emit: <K extends keyof Map>(event: K | symbol, ...data: TypeToData<Map[K]>) => boolean
  
  off: <K extends keyof Map>(event: K | symbol, listener?: Listener<Map[K]>) => this
  removeListener: <K extends keyof Map>(event: K | symbol, listener?: Listener<Map[K]>) => this
  
  removeAllListeners: <K extends keyof Map>(event?: K | symbol) => this
  
  prependListener: <K extends keyof Map>(event: symbol | K, listener?: Listener<Map[K]>) => this
  prependOnceListener: <K extends keyof Map>(event: K | symbol, listener?: Listener<Map[K]>) => this
  
  listeners: <K extends keyof Map> (event: K | symbol) => Listener<Map[K]>[]
  rawListeners: <K extends keyof Map> (event: K | symbol) => Listener<Map[K]>[]
}
