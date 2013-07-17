# chopchop
(wip) easy paging for web apps

## usage
```js
var chopchop = require('chopchop')

// assuming an express app
app.get('/foos',
  chopchop(),
  function (req, res) {
    console.log(req.paging)
    // => {
    //  defaultLimit: 10,
    //  maxLimit: 50,
    //  skip: 0,
    //  limit: 10,
    //  pageNumber: 1,
    //  sort: undefined,
    //  sortOrder: 1
    // }

  }
)
```

`chopchop` parses querystring parameters:

- `limit`
- `skip`
- `sort`: property name to sort by
- `sortOrder`: `asc` or `desc`, gets parsed as `1` for `asc`, `-1` for `desc`

## api

`chopchop: (opts?: Object) => ConnectMiddleware`

options:
- `defaultLimit`: Int
- `maxLimit`: Int
- `sortable`: Array<String> - whitelisted property names that are sortable
- `defaultSort`: String - default sort property

`chopchop.query: (req: Object, query: MinqQuery) => MinqQuery`

if you've got a [`minq`](https://npm.im/minq) Query, say, you can inject all of your paging parameters into it with this method. `req` should be the HttpRequest object after being banged up a bit by the `chopchop` middleware. Example:

```js
var pagedQuery = chopchop(req,
  minq.from('users')
      .where({'active':true})
  )
  .toArray()
```

## installation

    $ npm install chopchop


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md
