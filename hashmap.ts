import { LinkedList } from "./linked-list.ts"

type Entries<T> = [string, T]

interface HashmapInterface<T> {
  _initBuckets: () => void
  hash: (key: string) => number
  set: (key: string, value: T) => void
  get: (key: string) => T | null
  has: (key: string) => boolean
  remove: (key: string) => boolean
  length: () => number
  keys: () => string[]
  values: () => T[]
  entries: () => Entries<T>[]
}

export class Hashmap<T> implements HashmapInterface<T> {
  private capacity = 16
  private loadFactor = 0.75
  private counter = 0
  public bucketList: LinkedList<string, T>[] = new Array(this.capacity).fill(
    null
  )

  constructor() {
    this._initBuckets()
  }

  _initBuckets() {
    for (let i = 0; i < this.capacity; i++) {
      this.bucketList[i] = new LinkedList<string, T>()
    }
  }

  hash(key: string) {
    const PRIME_NUMBER = 31
    let hashCode = 0

    for (let i = 0; i < key.length; i++) {
      hashCode = (PRIME_NUMBER * hashCode + key.charCodeAt(i)) % this.capacity
    }

    return hashCode
  }

  has(key: string) {
    const bucket = this.bucketList[this.hash(key)]
    return bucket.contains(key)
  }
}
