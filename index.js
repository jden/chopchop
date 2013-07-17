function intOrDefault(num, def) {
  return Number.isFinite(parseInt(num)) ? num : def
}

function bound(num, min, max, def) {
  return Math.max(Math.min(intOrDefault(num, def), max), min)
}

var paged = function (opts) {
  opts = opts || {}
  opts.limit = intOrDefault(opts.limit, 10)
  opts.maxLimit = intOrDefault(opts.maxLimit, 50)
  opts.sortable = Array.isArray(opts.sortable)
                    ? opts.sortable
                    : []
  // opts.sortDefault

  return function (req, res, next) {
    var paging = {
      defaultLimit: opts.limit,
      maxLimit: opts.maxLimit
    }
    paging.skip = bound(req.query.skip, 0, Infinity, 0)
    paging.limit = bound(req.query.limit, 1, opts.maxLimit, opts.limit)
    paging.pageNumber = (paging.skip ? Math.floor(paging.limit) : 0) + 1

    paging.sort = opts.sortable.indexOf(req.query.sort) !== -1
                    ? req.query.sort
                    : opts.sortDefault
    paging.sortOrder = req.query.sortOrder === 'desc'
                    ? -1
                    : 1

    req.paging = paging
    next()
  }
}

paged.query = function (req, query) {
  var mongoSort;
  if (req.paging.sort) {
    var sort;
    if (req.paging.sort === 'title') {
      sort = 'meta.titleShort'
    } else {
      sort = req.paging.sort
    }
    mongoSort = {}
    mongoSort[sort] = req.paging.sortOrder
    query = query.sort(mongoSort)
  }

  if (req.paging.limit) {
    query = query.limit(req.paging.limit)
  }

  if (req.paging.skip) {
    query = query.skip(req.paging.skip)
  }

  return query
}

module.exports = paged