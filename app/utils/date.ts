import _dayjs, { Dayjs } from "dayjs"

const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
const customParseFormat = require("dayjs/plugin/customParseFormat")
_dayjs.extend(utc)
_dayjs.extend(timezone)
_dayjs.extend(customParseFormat)

export default function dayjs(...args: any): Dayjs {
  return _dayjs.tz(...args)
}
