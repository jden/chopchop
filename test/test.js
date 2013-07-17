var chai = require('chai')
chai.should()

describe('chopchop', function () {
  var chopchop = require('../')
  
  it('returns middleware', function (done) {

    chopchop.should.be.a('function')

    var middleware = chopchop()
    middleware.should.be.a('function')

    middleware({query:{}}, null, done)

  })

  describe('parsing', function () {

    it('parses limit', function (done) {
      var req = {
        query: {
          limit: 10
        }
      }

      chopchop()(req, null, function () {
        req.paging.limit.should.equal(10)
        done()
      })
    })

    it('defaults to opts.defaultLimit', function (done) {
      var req = {
        query: {}
      }

      chopchop({defaultLimit: 12})(req, null, function () {
        req.paging.limit.should.equal(12)
        done()
      })
    })

    it('parses skip', function (done) {
      var req = {
        query: {
          skip: 23
        }
      }

      chopchop()(req, null, function () {
        req.paging.skip.should.equal(23)
        done()
      })
    })

    it('parses sort', function (done) {
      var req = {
        query: {
          sort: 'foo'
        }
      }

      chopchop({sortable: ['foo']})(req, null, function () {
        req.paging.sort.should.equal('foo')
        done()
      })
    })

    it('whitelists sortable', function (done) {
      var req = {
        query: {
          sort: 'foo'
        }
      }

      chopchop({sortable: ['baz']})(req, null, function () {
        chai.expect(req.paging.sort).to.equal(undefined)
        done()
      })
    })

    it('whitelists sortable', function (done) {
      var req = {
        query: {
          sort: 'foo'
        }
      }

      chopchop({sortable: ['baz']})(req, null, function () {
        chai.expect(req.paging.sort).to.equal(undefined)
        done()
      })
    })

  })

  
})