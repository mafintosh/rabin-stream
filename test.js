const RabinStream = require('./')
const tape = require('tape')
const tar = require('tar-fs')

tape('basic', function (t) {
  const r = new RabinStream()

  r.on('data', (data) => {
    t.same(data, Buffer.from('abc'))
    t.end()
  })

  r.write('a')
  r.write('b')
  r.write('c')
  r.end()
})

tape('more data', function (t) {
  chunk(null, function (a) {
    chunk(Buffer.alloc(5555).fill('injected!!'), function (b) {
      const changed = new Set()
      for (const c of b) {
        if (a.has(c)) continue
        changed.add(c)
      }

      t.ok(changed.size < b.size / 20, changed.size + ' changes (less < 5% ish) out of ' + b.size)
      t.end()
    })
  })

  function chunk (prelude, cb) {
    const chunks = new Set()

    const r = new RabinStream({
      min: 4 * 1024,
      bits: 25
    })

    r.on('data', function (data) {
      chunks.add(data.toString('hex'))
    })
    r.on('end', function () {
      cb(chunks)
    })

    if (prelude) r.write(prelude)
    tar.pack(__dirname).pipe(r)
  }
})
