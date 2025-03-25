const Enum = require("../implementation/enum");

describe("Enum Utility", () => {
  test("should define an enum correctly", () => {
    const Colors = Enum.define({ RED: "red", GREEN: "green", BLUE: "blue" });

    expect(Colors.RED).toBe("red");
    expect(Colors.GREEN).toBe("green");
    expect(Colors.BLUE).toBe("blue");
  });

  test("should support reverse mapping", () => {
    const Status = Enum.define(
      { PENDING: 1, APPROVED: 2, REJECTED: 3 },
      { reverseMapping: true }
    );

    expect(Status[1]).toBe("PENDING");
    expect(Status[2]).toBe("APPROVED");
    expect(Status[3]).toBe("REJECTED");
  });

  test("should check if a key exists", () => {
    const Colors = Enum.define({ RED: 0, GREEN: 1, BLUE: 2 });
    expect(Colors.hasKey("RED")).toBe(true);
    expect(Colors.hasKey("YELLOW")).toBe(false);
  });

  test("should check if a value exists", () => {
    const Colors = Enum.define({ RED: 0, GREEN: 1, BLUE: 2 });
    expect(Colors.hasValue(0)).toBe(true);
    expect(Colors.hasValue(3)).toBe(false);
  });

  test("should check if a value is valid", () => {
    const Status = Enum.define(
      { PENDING: 1, APPROVED: 2, REJECTED: 3 },
      { reverseMapping: true }
    );

    expect(Status.isValid(1)).toBe(true);
    expect(Status.isValid("APPROVED")).toBe(false);
  });

  test("should return keys, values, and entries", () => {
    const Colors = Enum.define({ RED: 0, GREEN: 1, BLUE: 2 });

    expect(Colors.keys()).toEqual(["RED", "GREEN", "BLUE"]);
    expect(Colors.values()).toEqual([0, 1, 2]);
    expect(Colors.entries()).toEqual([
      ["RED", 0],
      ["GREEN", 1],
      ["BLUE", 2]
    ]);
  });
});
