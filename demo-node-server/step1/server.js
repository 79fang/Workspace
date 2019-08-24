var http = require('http')  //创建服务器
var path = require('path')  //处理url
var fs = require('fs')       //读写文件
var url = require('url')     //自动解析url

function staticRoot(staticPath, req, res) {
  console.log(staticPath)

  console.log(req.url)
  var pathObj = url.parse(req.url, true)  //解析url
  console.log(pathObj)

  // 没有文件后缀时,设置index.html为默认
  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }

  var filePath = path.join(staticPath, pathObj.pathname)

  // 同步读文件
  // var fileContent = fs.readFileSync(filePath,'binary')
  // res.write(fileContent,'binary')
  // res.end()

  // 异步读文件
  // binary 转换二进制
  fs.readFile(filePath, 'binary', function (err, fileContent) {
    //如果读取出错
    if (err) {
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 NotFound<h1>')
    } else {
      console.log('ok')
      res.writeHead(200, 'ok')
      res.write(fileContent, 'binary')
      res.end()
    }

  })


}

//展示拼接成的绝对路径(读文件需要绝对路径)
console.log(path.join(__dirname, 'static'))

// __dirname:代表当前路径
//'static':请求文件路径


//收到请求后,执行函数
var server = http.createServer(function (req, res) {
  staticRoot(path.join(__dirname, 'static'), req, res)


})

//绑定端口
server.listen(8080)
console.log('visit http://localhost:8080')