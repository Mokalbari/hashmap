export type Data<K, V> = {
  key: K
  value: V
}

export type Nullable<T> = T | null

export class Node<K, V> {
  public next: Nullable<Node<K, V>>
  public data: Data<K, V>

  constructor(key: K, value: V) {
    this.data = { key, value }
    this.next = null
  }
}
