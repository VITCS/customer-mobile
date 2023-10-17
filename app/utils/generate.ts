import { v4 } from "uuid"

export const generateUniquUID = () => {
  // const currentDate = dayjs().unix()
  // const randomStringWithNumbersOnly = Math.random()
  //   .toString(36)
  //   .replace(/[^a-zA-Z0-9]+/g, "")
  //   .substring(0, length)
  // return `${currentDate}${randomStringWithNumbersOnly}`
  return v4()
}
