'use strict'

var should = require('chai').should() // eslint-disable-line

describe('Mustache renderer', function () {
  var r = require('../lib/renderer')

  it('escaped variable test', function () {
    var body = [
      'Hello {{ name }}!'
    ].join('\n')

    r({text: body}, {
      name: 'world'
    }).should.eql('Hello world!')
  })

  it('unescaped variable test', function () {
    var body = [
      'Hello {{{ name }}}!'
    ].join('\n')

    r({text: body}, {
      name: '<b>world</b>'
    }).should.eql('Hello <b>world</b>!')
  })

  it('empty lists test', function () {
    var body = [
      'Shown.',
      '{{ #name }}',
      'Never Shown!',
      '{{ /name }}'
    ].join('')

    var data = {
      name: false
    }

    r({text: body}, data).should.eql('Shown.')
  })

  it('Non-Empty array test', function () {
    var body = [
      '{{ #arr }}',
      '{{.}}',
      '{{ /arr }}'
    ].join('')

    var data = {
      arr: [1, 2, 3]
    }

    r({text: body}, data).should.eql('123')
  })

  it('Non-Empty object test', function () {
    var body = [
      '{{ #stooges }}',
      '{{name}}',
      '{{ /stooges }}'
    ].join('')

    var data = {
      'stooges': [
        { 'name': 'Moe' },
        { 'name': 'Larry' },
        { 'name': 'Curly' }
      ]
    }

    r({text: body}, data).should.eql('MoeLarryCurly')
  })

  it('functions test', function () {
    var body = [
      '{{#bold}}Hello {{name}}!{{/bold}}'
    ].join('\n')

    r({text: body}, {
      name: 'world',
      'bold': function () {
        return function (text, render) {
          return '<b>' + render(text) + '</b>'
        }
      }
    }).should.eql('<b>Hello world!</b>')
  })

  it('inverted sections test', function () {
    var body = [
      '{{#repos}}<b>{{name}}</b>{{/repos}}',
      '{{^repos}}No repos :({{/repos}}'
    ].join('')

    r({text: body}, {
      repos: []
    }).should.eql('No repos :(')
  })

  it('escaped variable test', function () {
    var body = [
      'Hello{{! ignore me }}!'
    ].join('\n')

    r({text: body}).should.eql('Hello!')
  })

  it('compile test', function () {
    var body = [
      'Hello {{ name }}!'
    ].join('\n')

    var render = r.compile({
      text: body
    })

    render({
      name: 'world'
    }).should.eql('Hello world!')
  })
})
