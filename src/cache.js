export default class Cache {
  constructor (prefix) {
    this._prefix = prefix
    this._storage = window.localStorage
  }

  prefix (key) {
    return this._prefix + key
  }

  set (key, value) {
    if (!this._storage) {
      return
    }
    this._storage.setItem(this.prefix(key), value)
  }

  get (key) {
    if (!this._storage) {
      return
    }
    return this._storage.getItem(this.prefix(key))
  }

  clear (key) {
    if (!this._storage) {
      return
    }
    return this._storage.removeItem(this.prefix(key))
  }
}
