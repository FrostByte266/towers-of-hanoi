import { playField } from "./domElements.js"

class GameEventBase extends Event {
  constructor(name, emitFrom) {
    super(name)
    this._emitFrom = emitFrom
  }

  emit() {
    this._emitFrom.dispatchEvent(this)
  }
}

export class DiskMovedEvent extends GameEventBase {
  constructor(origin, destination, disk) {
    super("disk-moved", playField)
    this.origin = origin
    this.destination = destination
    this.disk = disk
  }
}

export class GameStartEvent extends GameEventBase {
  constructor(numDisks) {
    super("game-start", document.body)
    this.numDisks = numDisks
  }
}

export class GameEndEvent extends GameEventBase {
  constructor() {
    super("game-end", document.body)
  }
}
