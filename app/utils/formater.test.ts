import { formatname } from "./format"

describe("user name formatter", () => {
  it("if all are not null", () => {
    const user = {
      firstName: "first",
      lastName: "last",
      middleName: "middle",
    }

    const result = formatname(user.firstName, user.middleName, user.lastName)

    expect(result).toBe("first middle last")
  })

  it("if first name is  null", () => {
    const user = {
      firstName: null,
      lastName: "last",
      middleName: "middle",
    }

    const result = formatname(user.firstName, user.middleName, user.lastName)

    expect(result).toBe("middle last")
  })
  it("if middle name is  null", () => {
    const user = {
      firstName: "first",
      middleName: null,
      lastName: "last",
    }

    const result = formatname(user.firstName, user.middleName, user.lastName)

    expect(result).toBe("first last")
  })

  it("if last name is  null", () => {
    const user = {
      firstName: "first",
      middleName: "middle",
      lastName: null,
    }

    const result = formatname(user.firstName, user.middleName, user.lastName)

    expect(result).toBe("first middle")
  })
})
