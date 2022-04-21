// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function compact<HEADER = any, DATA extends Array<any> = any[]>(arr: any[], defaultValue?: any): [headers: HEADER[], ...data: DATA[]] {
  const headers = []

  const data = arr.map(item => {
    Object.keys(item).forEach(key => headers.includes(key) || headers.push(key))
    return headers.map(key => item[key] ?? defaultValue)
  })
  return [headers].concat(data) as any
}

declare function filterInput(input: any): boolean
export function expand<R = any>(result: any[], filter?: typeof filterInput): R[] {
  if (result.length === 0) return []
  const [headers, ...data] = result
  if (typeof filter === 'function') {
    return data.map(row => headers.reduce((obj, header, index) => {
      if (filter(row[index])) {
        obj[header] = row[index]
      }
      return obj
    }, {}))
  } else {
    return data.map(row => headers.reduce((obj, header, index) => {
      obj[header] = row[index]
      return obj
    }, {}))
  }
}
