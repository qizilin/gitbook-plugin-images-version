var cheerio = require('cheerio')
var URI = require('urijs')

var version = Number.parseInt(Date.now() / 1000)
module.exports = {
  hooks: {
    page: function(page) {
      var $ = cheerio.load(page.content)
      $('img').each(function(index, img) {
        var src = img.attribs.src
        if (src) {
          var url = new URI(src)
          url.addQuery('v', version)
          img.attribs.src = url.toString()
        }
      })
      page.content = $.html()
      return page
    }
  }
}
