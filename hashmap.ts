import { LinkedList } from "./linked-list.ts"

type Entries<T> = [string, T]

interface HashmapInterface<T> {
  hash: (key: string) => number
  set: (key: string, value: T) => void
  get: (key: string) => T | null
  has: (key: string) => boolean
  remove: (key: string) => boolean
  length: () => number
  lengthWithSize: () => string
  keys: () => string[]
  values: () => T[]
  entries: () => Entries<T>[]
  clear: () => void
}

export class Hashmap<T> implements HashmapInterface<T> {
  #capacity = 16
  #loadFactor = 0.75
  #counter = 0
  #maxEntries = Math.floor(this.#capacity * this.#loadFactor)

  public bucketList: LinkedList<string, T>[] = []

  constructor() {
    this.#initBuckets()
  }

  #calculateMaxEntries() {
    this.#maxEntries = Math.floor(this.#capacity * this.#loadFactor)
  }

  #doubleCapacity() {
    this.#capacity = this.#capacity * 2
  }

  #initBuckets() {
    this.bucketList = new Array(this.#capacity)
      .fill(null)
      .map(() => new LinkedList<string, T>())
  }

  #resize() {
    const oldBucketList = this.bucketList

    this.#doubleCapacity()
    this.#calculateMaxEntries()
    this.#initBuckets()

    for (const bucket of oldBucketList) {
      const entries = bucket.toArray("both") as [string, T][]
      for (const [key, value] of entries) {
        const newBucket = this.#getBucket(key)
        newBucket.append(key, value)
      }
    }
  }

  hash(key: string) {
    const PRIME_NUMBER = 31
    let hashCode = 0

    for (let i = 0; i < key.length; i++) {
      hashCode = (PRIME_NUMBER * hashCode + key.charCodeAt(i)) % this.#capacity
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
      return
    }

    if (this.#counter + 1 >= this.#maxEntries) {
      this.#resize()
      const newBucket = this.#getBucket(key)
      if (newBucket.append(key, value)) this.#counter++
    } else {
      if (bucket.append(key, value)) this.#counter++
    }
  }
  get(key: string) {
    const bucket = this.#getBucket(key)
    return bucket.read(key)
  }

  remove(key: string) {
    const bucket = this.#getBucket(key)
    const index = bucket.findIndex(key)
    const removedData = bucket.removeAt(index)
    if (removedData) this.#counter--
    return removedData
  }

  length() {
    return this.#counter
  }

  lengthWithSize() {
    return `${this.length()} of ${
      this.#capacity
    } max capacity. The max entries are fixed at ${
      this.#maxEntries
    } with a load factor of ${this.#loadFactor}`
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

  clear() {
    this.#counter = 0
    this.#capacity = 16
    this.#calculateMaxEntries()
    this.#initBuckets()
  }
}
