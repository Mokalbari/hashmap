import { createLinkedList } from "./linked-list/create-linked-list.ts"

type Bucket = ReturnType<typeof createLinkedList>

export function createHashmap() {
  const loadFactor = 0.75
  let capacity = 16
  let counter = 0
  const bucketList: Bucket[] = new Array(capacity).fill(null)

  const _initBucket = () => {
    for (let i = 0; i < capacity; i++) {
      bucketList[i] = createLinkedList()
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

  return { hash, has, set }
}

/* 
TODO : modifier la f() set pour utiliser le built in updateValue de linked list
Actuellement, la f() modifie une copie des données mais pas les données
Implémenter la fonction counter
*/
