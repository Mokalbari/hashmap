import { createLinkedList } from "./linked-list/create-linked-list.ts"

type Bucket = ReturnType<typeof createLinkedList>

export function createHashmap() {
  const loadFactor = 0.75
  const capacity = 16
  const bucketList: Bucket[] = new Array(capacity).fill(null)

  const initBucket = () => {
    for (let i = 0; i < capacity; i++) {
      bucketList[i] = createLinkedList()
    }
  }

  const hash = (key: string) => {
    const PRIME_NUMBER = 31
    let hashCode = 0

    for (let i = 0; i < key.length; i++) {
      hashCode = (PRIME_NUMBER * hashCode + key.charCodeAt(i)) % capacity
    }

    return hashCode
  }

  const has = (key: string): boolean => {
    const bucketNumber = hash(key)
    const bucket = bucketList[bucketNumber]
    return bucket.contains(key)
  }

  const set = <Type>(key: string, value: Type) => {
    const bucketNumber = hash(key)
    const bucket = bucketList[bucketNumber]

    if (has(key)) {
    }
  }

  return { initBucket, hash, has, set }
}
