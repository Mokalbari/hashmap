import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { createHashmap } from "./main.ts"

describe("hashmap and it's functions", () => {
  it("does not go above 15 when hashing a random key", () => {
    const testHashMap = createHashmap()
    expect(testHashMap.hash("key")).toBeLessThan(16)
    expect(testHashMap.hash("machin")).toBeLessThan(16)
    expect(testHashMap.hash("COUSCOUS")).toBeLessThan(16)
    expect(testHashMap.hash("MA chLFOHE hfdso  HF EOIH")).toBeLessThan(16)
    expect(
      testHashMap.hash(
        "pfdsou fessofhii 156f dsf oihf i f44sd6 e65f4 s65 s df  lksdhlkjfl"
      )
    ).toBeLessThan(16)
  })
})
