// import { expect } from "jsr:@std/expect/expect"
// import { describe, it } from "jsr:@std/testing/bdd"
// import { LinkedList } from "./linked-list.ts"

// describe("empty linked list implementation", () => {
//   const ll = new LinkedList()
//   it("returns 0 when the list is empty", () => {
//     expect(ll.size()).toBe(0)
//   })
//   it("returns true when the list is empty", () => {
//     expect(ll.isEmpty()).toBeTruthy()
//   })
//   it("returns null when trying to get head or tail", () => {
//     expect(ll.getHead()).toBeNull()
//     expect(ll.getTail()).toBeNull()
//   })
//   it("returns null when trying to access a random position in the list", () => {
//     expect(ll.at(Math.floor(Math.random() * 10)))
//     expect(ll.at(Math.floor(Math.random() * 10)))
//     expect(ll.at(Math.floor(Math.random() * 10)))
//   })
//   it("returns an empty string when trying to print list", () => {
//     expect(ll.toString(false)).toBe("")
//     expect(ll.toString(true)).toBe("")
//   })
// })

// describe("one element inside list", () => {
//   const ll = new LinkedList()
//   ll.append("cat", "miaou")

//   it("returns a size of 1", () => {
//     expect(ll.size()).toBe(1)
//   })
//   it("returns a full head and a full tail", () => {
//     expect(ll.getHead()).toEqual({ key: "cat", value: "miaou" })
//     expect(ll.getTail()).toEqual({ key: "cat", value: "miaou" })
//   })
//   it("prints with or without key", () => {
//     expect(ll.toString(true)).toBe("cat: miaou")
//     expect(ll.toString(false)).toBe("miaou")
//   })
//   it("reads a value from a key", () => {
//     expect(ll.read("cat")).toBe("miaou")
//   })
//   it("finds the node with a key", () => {
//     expect(ll.find("cat")).toEqual({ key: "cat", value: "miaou" })
//   })
//   it("returns false when the key has no next key", () => {
//     expect(ll.keyHasNext("cat")).toBeFalsy()
//   })
//   it("can delete the array", () => {
//     ll.clear()
//     expect(ll.getHead()).toBeNull()
//     expect(ll.size()).toBe(0)
//   })
// })

// describe("multiple elements inside a list with manipulation", () => {
//   const ll = new LinkedList()
//   ll.append("dog", "ouaf")
//   ll.append("cat", "miaou")
//   ll.append("cow", "mow")
//   it("prints the list with or without key", () => {
//     expect(ll.toString(true)).toBe("dog: ouaf -> cat: miaou -> cow: mow")
//     expect(ll.toString(false)).toBe("ouaf -> miaou -> mow")
//   })
//   it("returns the correct head and tail", () => {
//     expect(ll.getHead()).toEqual({ key: "dog", value: "ouaf" })
//     expect(ll.getTail()).toEqual({ key: "cow", value: "mow" })
//   })
//   it("returns a size 3", () => {
//     expect(ll.size()).toBe(3)
//   })
//   it("returns cat when accessing the data at position 1", () => {
//     expect(ll.at(1)).toEqual({ key: "cat", value: "miaou" })
//   })
//   it("returns true when asked if cat has next", () => {
//     expect(ll.keyHasNext("cat")).toBeTruthy()
//   })
//   it("returns false when asked if fox exists", () => {
//     expect(ll.contains("fox")).toBeFalsy()
//   })
//   it("returns true when asked if cow exists", () => {
//     expect(ll.contains("cow")).toBeTruthy()
//   })

//   it("prepends a value correctly", () => {
//     ll.prepend("snake", "sss")
//     expect(ll.getHead()).toEqual({ key: "snake", value: "sss" })
//     expect(ll.at(1)).toEqual({ key: "dog", value: "ouaf" })
//   })

//   it("can insert in the middle", () => {
//     ll.insertAt(1, "malcolm", "in the middle")
//     expect(ll.at(1)).toEqual({ key: "malcolm", value: "in the middle" })
//     expect(ll.readNextKey(0)).toEqual("malcolm")
//     expect(ll.getHead()).toEqual({ key: "snake", value: "sss" })
//     expect(ll.at(2)).toEqual({ key: "dog", value: "ouaf" })
//   })
// })
