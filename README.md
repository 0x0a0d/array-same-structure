# array-same-structure

to reduce space when exchanging an array of data whose elements are objects of the same structure

`array-same-structure` provide 2 functions `compact` and `expand`

- `compact`: put data in the form of [ headers: `(keyof object)[]`, ...dataCompacted: `(valueOf object in-headers-order)[]` ]
- `expand`: reconstruct array from `headers` and `dataCompacted`

# install
```bash
npm i array-same-structure
# -- Or --
yarn add array-same-structure
```

# method
- compact(arr: object[], defaultValueIfUndefined?: any): [headers, ...data: any[][]]
> `defaultValueIfUndefined` will replace `undefined` value if set
- expand(dataCompacted: any[][], filter?: filterFunction): object[]
> `filterFunction`: a function with `input: any` and return `true` if we should add `input` to result or `false` to ignore it

# example
```js
compact([
//=> headers: ['a', 'b', 'c', 'd', 'e']
  { a: 1 }, // [1]
  { a: 2, b: 3 }, // [2, 3]
  { a: 3, c: 4 }, // [3, undefined, 4]
  { a: 4, d: 4, e: 5, c: 1 }, // [4, undefined, 1, 4, 5]
  { a: 5, b: 4, e: 5, c: 1 }, // [5, 4, 1, undefined, 5]
])
compact([
//=> headers: ['a', 'b', 'c', 'd', 'e']
  { a: 1 }, // [1]
  { a: 2, b: 3 }, // [2, 3]
  { a: 3, c: 4 }, // [3, '', 4]
  { a: 4, d: 4, e: 5, c: 1 }, // [4, '', 1, 4, 5]
  { a: 5, b: 4, e: 5, c: 1 }, // [5, 4, 1, '', 5]
], '')

expand([
  ['a', 'b', 'c', 'd', 'e'],
  [1], // { a: 1, b: undefined, c: undefined, d: undefined, e: undefined }
  [2, 3], // { a: 2, b: 3, c: undefined, d: undefined, e: undefined }
  [3, undefined, 4], // { a: 3, b: undefined, c: 4, d: undefined, e: undefined }
  [4, undefined, 1, 4, 5], // { a: 4, b: undefined, c: 1, d: 4, e: 5 }
  [5, 4, 1, undefined, 5]  // { a: 5, b: 4, c: 1, d: undefined, e: 5 }
])
expand([
  ['a', 'b', 'c', 'd', 'e'],
  [1], // { a: 1 }
  [2, 3], // { a: 2, b: 3 }
  [3, undefined, 4], // { a: 3, c: 4 }
  [4, undefined, 1, 4, 5], // { a: 4, c: 1, d: 4, e: 5 }
  [5, 4, 1, undefined, 5] // { a: 5, b: 4, c: 1, e: 5 }
], v => v != null)
```
