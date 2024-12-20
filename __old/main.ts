import { createLinkedList } from "./create-linked-list.ts"

type Bucket = ReturnType<typeof createLinkedList>

type Node = {
  key: string
  value: unknown
}

export function createHashmap() {
  const loadFactor = 0.75
  let capacity = 16
  let counter = 0
  const bucketList: Bucket[] = new Array(capacity).fill(null)

  const _initBucket = () => {
    for (let i = 0; i < capacity; i++) {
      bucketList[i] = createLinkedList<Node>()
    }
  }

  _initBucket()

  const hash = (key: string) => {
    const PRIME_NUMBER = 31
    let hashCode = 0

    for (let i = 0; i < key.length; i++) {
      hashCode = (PRIME_NUMBER * hashCode + key.charCodeAt(i)) % capacity
    }

    return hashCode
  }

  const has = (key: string): boolean => {
    const bucket = bucketList[hash(key)]
    return bucket.contains(key)
  }

  const set = <Type>(key: string, value: Type) => {
    const bucketNumber = hash(key)
    const bucket = bucketList[bucketNumber]

    if (has(key)) {
      bucket.updateValueAtIndex({ key, value }, bucketNumber)
    }

    bucket.addLast({ key, value })
  }

  const get = (key: string) => {
    const bucket = bucketList[hash(key)]

    if (has(key)) {
      const index = bucket.find(key)
      const { key, value } = bucket.getDataAtIndex(index)
    }
    return null
  }

  return { hash, has, set, get }
}

/* 
TODO : modifier la f() set pour utiliser le built in updateValue de linked list
Actuellement, la f() modifie une copie des données mais pas les données
Implémenter la fonction counter
*/
