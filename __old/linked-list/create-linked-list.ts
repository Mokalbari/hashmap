import type { Node } from "./types.ts"

type key = string
type value = unknown
type NodeData = Record<key, value>

export function createLinkedList<T>() {
  let head: Node<T> | null = null

  const isEmpty = (): boolean => head === null

  const addFirst = (value: T): void => {
    head = createNode(value, head)
  }

  const getHead = (): T | null => {
    if (!head) return null
    return head.data
  }

  const addLast = (value: T): void => {
    const newNode = createNode(value)
    if (!head) {
      head = newNode
      return
    }
    let currentNode = head
    while (currentNode.next !== null) {
      currentNode = currentNode.next
    }
    currentNode.next = newNode
  }

  const getTail = (): T | null => {
    if (!head) return null
    let currentNode = head
    while (currentNode.next !== null) {
      currentNode = currentNode.next
    }
    return currentNode.data
  }

  const getSize = (): number => {
    let size = 0
    if (!head) return size
    let currentNode: Node<T> | null = head
    while (currentNode !== null) {
      size++
      currentNode = currentNode.next
    }
    return size
  }

  const getDataAtIndex = (index: number): T | null => {
    if (!head || index < 0) return null

    let currentNode: Node<T> | null = head
    let currentIndex = 0

    while (currentNode !== null) {
      if (currentIndex === index) return currentNode.data
      currentNode = currentNode.next
      currentIndex++
    }

    return null
  }

  const readDataAtKeyIndex = (key: T) => {
    let currentNode = head

    while (currentNode !== null) {
      if (key === currentNode) {
        return currentNode.data
      }
      currentNode
    }
    return null
  }

  const pop = (): T | null => {
    if (!head) return null
    if (!head.next) {
      const data = head.data
      head = null
      return data
    }
    let currentNode = head
    while (currentNode.next?.next !== null) {
      currentNode = currentNode.next!
    }
    if (!currentNode.next) return null
    const data = currentNode.next.data
    currentNode.next = null
    return data
  }

  const contains = (value: T): boolean => {
    if (isEmpty()) return false
    let currentNode = head
    while (currentNode !== null) {
      if (currentNode.data === value) {
        return true
      }
      currentNode = currentNode.next
    }
    return false
  }

  const find = (value: T): number => {
    let currentIndex = 0
    let currentNode = head
    while (currentNode !== null) {
      if (currentNode.data === value) {
        return currentIndex
      }
      currentNode = currentNode.next
      currentIndex++
    }
    return -1
  }

  const updateValueAtIndex = (newValue: T, index: number): void => {
    let currentIndex = 0
    let currentNode = head

    while (currentNode !== null) {
      if (currentIndex === index) {
        currentNode.data = newValue
        return
      }
      currentNode = currentNode.next
      currentIndex++
    }
  }
  const toString = (): string => {
    if (isEmpty()) return "null"
    let output = ""
    let currentNode = head
    while (currentNode !== null) {
      output += `(${currentNode.data}) -> `
      currentNode = currentNode.next
    }
    output += "null"
    return output
  }

  return {
    isEmpty,
    addFirst,
    getHead,
    addLast,
    getTail,
    getSize,
    getDataAtIndex,
    pop,
    contains,
    find,
    updateValueAtIndex,
    toString,
    readDataAtKeyIndex,
  }
}
