




var http = require('http')
var fs = require('fs')

// console.log(__dirname)

var server = http.createServer(function (req, res) {
  try {
    var fileContent = fs.readFileSync(__dirname + '/static' + req.url)
    res.write(fileContent)
    // res.end()
  } catch (e) {
    res.writeHead(404, 'not found')
  }
  res.end()

})

server.listen(8080)
console.log('visit http://localhost:8080')