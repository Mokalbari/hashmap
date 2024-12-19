import type { Node } from "./types.ts"

export function createNode<Type>(data: Type, next: Node<Type> | null = null) {
  return { data, next }
}
