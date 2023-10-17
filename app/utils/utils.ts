export function onlyUnique(sourceArray: Array<any>) {
  return sourceArray.filter((value, index, self) => self.indexOf(value) === index)
}

export function getUnique(sourceArray: Array<any>) {}

export function isEmpty(value: string | number) {
  return String(value)?.length > 0
}
