import { EventEmitter as EM } from 'events'

interface MapType {
  [key: string]: any|any[]
}

type TypeToData <Value extends any[]|any> = Value extends any[] ? Value : [Value]

type Listener <Value extends any[]|any> = (...data: TypeToData<Value>) => void | Promise<void>

export class EventEmitter<Map extends MapType> extends EM {
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
