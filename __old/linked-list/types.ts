export type Node<T> = {
  data: T
  next: Node<T> | null
}
