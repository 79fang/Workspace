// 加载http模块
var http = require('http')
// 加载路径处理模块path
var path = require('path')
// 加载filesystem模块,提供本地文件读写能力
var fs = require('fs')
// 加载URL模块,用于将URL字符串解析为对象或将对象格式化为URL字符串
var url = require('url')


//路由接口
var routes = {
  '/a': function (req, res) {
    res.end(JSON.stringify(req.query))
  },

  '/b': function (req, res) {
    res.end('match /b')
  },

  '/a/c': function (req, res) {
    res.end('match /a/c')
  },

  '/search': function (req, res) {
    res.end('username=' + req.body.username + ',password=' + req.body.password)
  }

}


// 开启服务
var server = http.createServer(function (req, res) {
  routePath(req, res)

})

// 绑定端口
server.listen(8080)
console.log('visit http://localhost:8080')


function routePath(req, res) {
  // 解析url
  var pathObj = url.parse(req.url, true)
  //得到路由
  var handleFn = routes[pathObj.pathname]
  //匹配路由
  if (handleFn) {
    req.query = pathObj.query

    //处理post数据
    var body = ''
    req.on('data', function (chunk) {
      body += chunk
    }).on('data', function () {
      //post数据解析到body上
      req.body = parseBody(body)
      handleFn(req, res)
    })


  } else {
    staticRoot(path.resolve(__dirname, 'static'), req, res)   //把其他请求做静态文件处理



  }



}

function staticRoot(staticPath, req, res) {
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath, 'binary', function (err, content) {
    if (err) {
      res.writeHead('404', 'haha Not Found')
      return res.end()
    }
    res.writeHead(200, 'ok')
    res.writeHead(content, 'binary')
    res.end()


  })
}
//post数据解析到body上
function parseBody(body) {
  console.log(body)
  var obj = {}
  body.split('&').forEach(function (str) {
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}