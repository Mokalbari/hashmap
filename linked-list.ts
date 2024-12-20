import { type Data, Node, Nullable } from "./node.ts"

type Criteria = "key" | "value" | "both"

interface LinkedListInterface<K, V> {
  isEmpty: () => boolean
  size: () => number
  prepend: (key: K, value: V) => boolean
  append: (key: K, value: V) => boolean
  getHead: () => Data<K, V> | null
  getTail: () => Data<K, V> | null
  at: (position: number) => Data<K, V> | null
  clear: () => boolean
  pop: () => Data<K, V> | null
  nodeHasNext: (node: Node<K, V>) => boolean
  keyHasNext: (key: K) => boolean
  readNextKey: (position: number) => K | null
  contains: (key: K) => boolean
  find: (key: K) => Data<K, V> | null
  read: (key: K) => V | null
  toString: (criteria: Criteria) => string
  toArray: (criteria: Criteria) => K[] | V[] | [K, V][] | []
  insertAt: (position: number, key: K, value: V) => void
  removeAt: (position: number, key: K, value: V) => boolean
  updateAt: (position: number, key: K, value: V) => void
}

export class LinkedList<K, V> implements LinkedListInterface<K, V> {
  private head: Nullable<Node<K, V>>

  constructor() {
    this.head = null
  }

  isEmpty() {
    return this.head === null
  }

  size() {
    let temp = this.head
    let counter = 0
    if (!this.head) return counter

    while (temp !== null) {
      temp = temp.next
      counter++
    }

    return counter
  }

  prepend(key: K, value: V) {
    const node = new Node(key, value)

    if (!this.head) {
      this.head = node
      return true
    }

    const prevHead = this.head
    this.head = node
    this.head.next = prevHead
    return true
  }

  append(key: K, value: V) {
    const node = new Node(key, value)

    if (!this.head) {
      this.head = node
      return true
    }

    let temp = this.head
    while (temp.next !== null) {
      temp = temp.next
    }
    temp.next = node
    return true
  }

  getHead() {
    return this.head?.data ?? null
  }

  getTail() {
    if (!this.head) return null
    let temp = this.head
    while (temp.next !== null) {
      temp = temp.next
    }
    return temp.data
  }

  at(position: number) {
    if (!this.head || position < 0) return null

    let currentPosition = 0
    let temp: Nullable<Node<K, V>> = this.head

    while (temp) {
      if (position === currentPosition) return temp.data
      temp = temp.next
      currentPosition++
    }

    return null
  }

  clear() {
    this.head = null
    return true
  }

  pop() {
    if (!this.head) return null

    if (!this.head.next) {
      const data = this.head.data
      this.head = null
      return data
    }

    let previous = this.head
    let current = this.head.next!

    while (current.next) {
      previous = current
      current = current.next
    }

    const data = current.data
    previous.next = null
    return data
  }

  nodeHasNext(node: Node<K, V>) {
    return !!node.next
  }

  keyHasNext(key: K) {
    if (!this.head) return false

    let temp: Nullable<Node<K, V>> = this.head

    while (temp) {
      if (key === temp.data.key) {
        return temp.next ? true : false
      }
      temp = temp.next
    }
    return false
  }

  readNextKey(position: number) {
    if (!this.head || position < 0) return null

    let temp: Nullable<Node<K, V>> = this.head
    let currentPosition = 0

    while (temp) {
      if (position === currentPosition) {
        return temp.next?.data.key ?? null
      }
      temp = temp.next
      currentPosition++
    }

    return null
  }

  contains(key: K) {
    if (!this.head) return false

    let temp: Nullable<Node<K, V>> = this.head

    while (temp) {
      if (temp.data.key === key) return true
      temp = temp.next
    }

    return false
  }

  find(key: K) {
    if (!this.head) return null

    let temp: Nullable<Node<K, V>> = this.head

    while (temp) {
      if (temp.data.key === key) return temp.data
      temp = temp.next
    }

    return null
  }

  findIndex(key: K) {
    if (!this.head) return -1

    let temp: Nullable<Node<K, V>> = this.head
    let currentPosition = 0

    while (temp) {
      if (temp.data.key === key) return currentPosition
      temp = temp.next
      currentPosition++
    }
    return -1
  }

  read(key: K) {
    if (!this.head) return null
    let temp: Nullable<Node<K, V>> = this.head

    while (temp) {
      if (temp.data.key === key) return temp.data.value

      temp = temp.next
    }

    return null
  }

  toString(criteria: Criteria) {
    if (!this.head) return ""
    let temp: Nullable<Node<K, V>> = this.head

    const toPrint: string[] = []
    while (temp) {
      toPrint.push(
        criteria === "both"
          ? `${temp.data.key}: ${temp.data.value}`
          : `${temp.data[criteria]}`
      )
      temp = temp.next
    }

    return toPrint.join(" -> ")
  }

  insertAt(position: number, key: K, value: V) {
    if (position === 0) {
      this.prepend(key, value)
    }

    let current: Nullable<Node<K, V>> = this.head
    let currentPosition = 0

    while (current !== null && currentPosition < position - 1) {
      current = current.next
      currentPosition++
    }

    if (!current) {
      throw new Error(`Position ${position} is out of bounds`)
    }

    const newNode = new Node(key, value)
    newNode.next = current.next
    current.next = newNode

    return this
  }

  removeAt(position: number) {
    if (position < 0 || !this.head) return false

    let temp: Nullable<Node<K, V>> = this.head
    let previous: Nullable<Node<K, V>> = null
    let currentPosition = 0

    if (position === 0) {
      if (!this.nodeHasNext(temp)) {
        this.head = null
      } else {
        this.head = this.head.next
      }
      return true
    }

    while (temp !== null && currentPosition < position) {
      previous = temp
      temp = temp.next
      currentPosition++
    }

    if (!temp) {
      return false
    }

    previous!.next = temp.next
    temp = null
    return true
  }

  updateAt(position: number, key: K, value: V) {
    let temp: Nullable<Node<K, V>> = this.head
    let currentPosition = 0

    while (temp !== null && currentPosition < position) {
      temp = temp.next
      currentPosition++
    }

    if (!temp) {
      throw new Error(`Position ${position} is out of bounds`)
    }

    temp.data = { key, value }
  }

  toArray(criteria: Criteria): K[] | V[] | [K, V][] {
    if (!this.head) return []

    let temp: Nullable<Node<K, V>> = this.head

    if (criteria === "both") {
      const output: [K, V][] = []
      while (temp) {
        output.push([temp.data.key, temp.data.value])
        temp = temp.next
      }
      return output
    }

    const output: (K | V)[] = []
    while (temp) {
      output.push(temp.data[criteria])
      temp = temp.next
    }

    return output as typeof criteria extends "key" ? K[] : V[]
  }
}
