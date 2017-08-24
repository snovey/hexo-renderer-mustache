'use strict'

var mustache = require('mustache')

function mustacheCompile (data) {
  mustache.parse(data.text)
  return function (view, partials) {
    return mustache.render(data.text, view, partials)
  }
}

function mustacheRenderer (data, locals) {
  return mustacheCompile(data)(locals)
}

mustacheRenderer.compile = mustacheCompile

module.exports = mustacheRenderer
