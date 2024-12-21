import { LinkedList } from "./linked-list.ts"

type Entries<T> = [string, T]

interface HashmapInterface<T> {
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
    this.#initBuckets()
  }

  #initBuckets() {
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

  #getBucket(key: string) {
    return this.bucketList[this.hash(key)]
  }

  has(key: string) {
    const bucket = this.#getBucket(key)
    return bucket.contains(key)
  }

  set(key: string, value: T) {
    const bucket = this.#getBucket(key)
    const index = bucket.findIndex(key)

    if (index !== -1) {
      bucket.updateAt(index, key, value)
    }
  }

  get(key: string) {
    const bucket = this.#getBucket(key)
    return bucket.read(key)
  }

  remove(key: string) {
    const bucket = this.#getBucket(key)
    const index = bucket.findIndex(key)
    return bucket.removeAt(index)
  }

  length() {
    let counter = 0
    for (let i = 0; i < this.capacity; i++) {
      counter += this.bucketList[i].size()
    }
    return counter
  }

  keys() {
    const output: string[] = []
    for (let i = 0; i < this.bucketList.length; i++) {
      const bucketKeys = this.bucketList[i].toArray("key") as string[]
      output.push(...bucketKeys)
    }

    return output
  }

  values() {
    const output: T[] = []

    for (let i = 0; i < this.bucketList.length; i++) {
      const bucketValues = this.bucketList[i].toArray("value") as T[]
      output.push(...bucketValues)
    }

    return output
  }

  entries() {
    const output: Entries<T>[] = []

    for (let i = 0; i < this.bucketList.length; i++) {
      const entries = this.bucketList[i].toArray("both") as Entries<T>[]
      output.push(...entries)
    }

    return output
  }
}
