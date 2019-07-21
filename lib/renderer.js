'use strict'

var mustache = require('mustache')
var path = require('path')
var fs = require('fs')

var PARTIAL_DIR = '_partial'

function mustacheCompile (data) {
  mustache.parse(data.text)
  var partials = {}
  if (data.path) {
    var dir = path.join(path.dirname(data.path), PARTIAL_DIR)
    if (fs.existsSync(dir)) {
      var partialFiles = fs.readdirSync(dir)
      partialFiles.forEach(function (file) {
        var name = path.join(PARTIAL_DIR, path.basename(file, '.mustache'))
        partials[name] = fs.readFileSync(path.join(dir, file)).toString()
      })
    }
  }
  return function (view) {
    return mustache.render(data.text, view, partials)
  }
}

function mustacheRenderer (data, locals) {
  return mustacheCompile(data)(locals)
}

mustacheRenderer.compile = mustacheCompile

module.exports = mustacheRenderer
