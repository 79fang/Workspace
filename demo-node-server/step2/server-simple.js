// var http = require('http')
// var fs = require('fs')
// var url = require('url')

// http.createServer(function (req, res) {

//   var pathObj = url.parse(req.url, true)
//   console.log(pathObj)

//   switch (pathObj.pathname) {
//     case '/getWeather':
//       var ret
//       if (pathObj.query.city == 'beijing') {
//         ret = {
//           city: 'beijing',
//           weather: '晴天'
//         }
//       } else {
//         ret = {
//           city: pathObj.query.city,
//           weather: '不知道'
//         }
//       }
//       res.end(JSON.stringify(ret))
//       break;
//     case '/user/123':

//       res.end(fs.readFileSync(__dirname + '/static/user.tpl'))
//       break;
//     default:

//       res.end(fs.readFileSync(__dirname + '/static' + pathObj.pathname))

//   }



// }).listen(8080)


var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function (req, res) {
  //路由
  switch (req.url) {
    case '/getWeather':
      res.end(JSON.stringify({ a: 1, b: 2 }))
      break;
    case '/user/123':
      res.end(fs.readFileSync(__dirname + '/static/user'))
      break;
    default:
      res.end(fs.readFileSync(__dirname + '/static' + req.url))
  }


}).listen(8080)






http.createServer(function (req, res) {

  var pathObj = url.parse(req.url, true)
  console.log(pathObj)

  switch (pathObj.pathname) {
    case '/getWeather':
      var ret
      if (pathObj.query.city == 'beijing') {
        ret = {
          city: 'beijing',
          weather: '晴天'
        }
      } else {
        ret = {
          city: pathObj.query.city,
          weather: '不知道'
        }
      }
      res.end(JSON.stringify(ret))
      break;
    case '/user/123':

      res.end(fs.readFileSync(__dirname + '/static/user.tpl'))
      break;
    default:
      res.end(fs.readFileSync(__dirname + '/static' + pathObj.pathname))
  }
}).listen(8080)