import { EventEmitter } from './EventEmitter'

export const eventMapper = Symbol('__event_map')

function addEvent (target: EventEmitter<any>, method: string, event: string, type: 'on' | 'once') {
  if (target[eventMapper] === undefined) {
    target[eventMapper] = []
  } else if (!target.hasOwnProperty(eventMapper)) {
    target[eventMapper] = [ ...target[eventMapper] ]
  }

  target[eventMapper].push({
    event,
    method,
    type
  })
}

export function Event (event: string) {
  return function (target: EventEmitter<any>, method: string) {
    addEvent(target, method, event, 'on')
  }
}

export function Once (event: string) {
  return function (target: EventEmitter<any>, method: string) {
    addEvent(target, method, event, 'once')
  }
}