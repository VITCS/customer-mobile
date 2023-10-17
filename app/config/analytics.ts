import { Analytics } from "@aws-amplify/analytics"

const analyticsConfig = {
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: "02507ca2675f4a968b28baf54f48a4b1",
    // Amazon service region
    region: "us-east-1",
    mandatorySignIn: false,
  },
}

Analytics.configure(analyticsConfig)
// export const logger = new Logger("customer-mobile")

// console.log = (...args) => {
//   // console.log("custom logger >>>> ", ...args)
//   // logger.info(...args)
// }
console.error = (...args) => {
  Analytics.record({
    name: "error",
    attributes: { ...args },
  })
}

console.warn = (...args) => {
  Analytics.record({
    name: "warning",
    attributes: { ...args },
  })
}
