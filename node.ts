interface Data<K, V> {
  key: K
  value: V
}

export class Node<K, V> {
  public next: Node<K, V> | null
  public data: Data<K, V>

  constructor(key: K, value: V) {
    this.data = { key, value }
    this.next = null
  }
}
