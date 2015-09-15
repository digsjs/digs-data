# digs-data

> Database interface for digs

[![NPM](https://nodei.co/npm/digs-data.png?compact=true)](https://www.npmjs.com/package/digs-data)

[![Join the chat at https://gitter.im/digsjs/digs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/digsjs/digs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Overview

As of this writing, this is a [digs](https://www.npmjs.com/package/digs) plugin ([Hapi](http://hapijs.com) plugin) providing a wrapper around [Thinky](http://thinky.io), an ORM-type-thing for [RethinkDB](http://rethinkdb.com/).  It serves as a central connection pool to RethinkDB, and exposes some functionality to the `Server` object for other plugins to use.  If you need to define models and persist data in a **digs** server, use this package.

I'd like to provide a simple, pure-JavaScript JSON-based datastore as the default instead, but I'm not sure which to use (any ideas? [Let me know!](https://github.com/digsjs/digs-data/issues)).  Because of the reliance on RethinkDB, **digs** won't run without it, which is something I'd like to avoid.

## API

Currently, this plugin decorates the `Server` object with two methods:

### `model()`

An alias for [`thinky.createModel()`](http://thinky.io/documentation/api/thinky/#createmodel).  The returned model function is not a constructor like in Thinky, but rather a ["stamp"](https://www.npmjs.com/package/stampit).  It can be used with or without the `new` keyword.

### `types()`

Returns a reference to [`thinky.types`](http://thinky.io/documentation/schemas/).

## Author

[Christopher Hiller](https://boneskull.com)

## License

MIT

