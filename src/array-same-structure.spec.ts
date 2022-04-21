import { compact, expand } from './array-same-structure'

describe('array-same-structure.ts', function() {
  it('compact', () => {
    expect(compact([
      { a: 1 },
      { a: 2, b: 3 },
      { a: 3, c: 4 },
      { a: 4, d: 4, e: 5, c: 1 },
      { a: 5, b: 4, e: 5, c: 1 },
    ])).toStrictEqual([['a', 'b', 'c', 'd', 'e'], [1], [2, 3], [3, undefined, 4], [4, undefined, 1, 4, 5], [5, 4, 1, undefined, 5]])
    expect(compact([
      { a: 1 },
      { a: 2, b: 3 },
      { a: 3, c: 4 },
      { a: 4, d: 4, e: 5, c: 1 },
      { a: 5, b: 4, e: 5, c: 1 },
    ], '')).toStrictEqual([['a', 'b', 'c', 'd', 'e'], [1], [2, 3], [3, '', 4], [4, '', 1, 4, 5], [5, 4, 1, '', 5]])
  })

  it('expand', () => {
    expect(expand([['a', 'b', 'c', 'd', 'e'], [1], [2, 3], [3, undefined, 4], [4, undefined, 1, 4, 5], [5, 4, 1, undefined, 5]])).toStrictEqual([{ a: 1, b: undefined, c: undefined, d: undefined, e: undefined }, { a: 2, b: 3, c: undefined, d: undefined, e: undefined }, { a: 3, b: undefined, c: 4, d: undefined, e: undefined }, { a: 4, b: undefined, c: 1, d: 4, e: 5 }, { a: 5, b: 4, c: 1, d: undefined, e: 5 }])
    expect(expand([['a', 'b', 'c', 'd', 'e'], [1], [2, 3], [3, undefined, 4], [4, undefined, 1, 4, 5], [5, 4, 1, undefined, 5]], v => v != null)).toStrictEqual([{ a: 1 }, { a: 2, b: 3 }, { a: 3, c: 4 }, { a: 4, c: 1, d: 4, e: 5 }, { a: 5, b: 4, c: 1, e: 5 }])
  })
})
