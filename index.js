var cheerio = require('cheerio')
var URI = require('urijs')

var version = Number.parseInt(Date.now() / 1000)
module.exports = {
  filters: {
    addVersion: function(url) {
      var url = new URI(url)
      url.addQuery('_', version)
      return url.toString()
    }
  },
  hooks: {
    page: function(page) {
      var $ = cheerio.load(page.content)
      $('img').each(function(index, img) {
        var src = img.attribs.src
        if (src && src.indexOf('data:image') === -1) {
          var url = new URI(src)
          url.addQuery('_', version)
          img.attribs.src = url.toString()
        }
      })
      page.content = $.html()
      return page
    }
  }
}
