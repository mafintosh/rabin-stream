# rabin-stream

Streaming rabin chunker based on [rabin-native](https://github.com/hyperdivision/rabin-native)

```
npm install rabin-stream
```

## Usage

``` js
const RabinStream = require('rabin-stream')

const r = new RabinStream({
  min: ... // min chunk byteSize
  max: ... // max chunk byteSize
})

r.on('data', function (data) {
  console.log('got chunk!', data)
})

someStream.pipe(r)
```

## License

MIT
