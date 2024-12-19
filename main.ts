export function createHashmap() {
  const loadFactor = 0.75
  const capacity = 16

  const hash = (key: string) => {
    const PRIME_NUMBER = 31
    let hashCode = 0

    for (let i = 0; i < key.length; i++) {
      hashCode = (PRIME_NUMBER * hashCode + key.charCodeAt(i)) % capacity
    }

    return hashCode
  }

  return { hash }
}
