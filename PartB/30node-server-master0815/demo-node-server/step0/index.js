加载http模块
var http = require('http')

// 创建服务器
// req-被封装成对象的请求
// res-返回给用户的东西

// var server = http.createServer(function (req, res) {
//   // console.log(req) //展示请求附带的东西
//   console.log('jirengu')
//   res.setHeader("Content-Type", "text/html; charset=gpk")  //设置响应头
//   res.write('<h1>hello world<h1>')   //发给浏览器的东西,放入响应体(response)里面
//   res.end()  //结束数据传输
// })
// server.listen(9000)   //给服务器绑定端口



var server = http.createServer(function (request, response) {
  setTimeout(function () {

    // response.setHeader("Content-Type","text/plain; charset=gpk")
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.writeHead(200, 'haha')  //页面状态显示
    response.write('<html><head><meta charset="gpk" /><head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')

    response.end()

  }, 2000); //延时2秒


}
)
console.log('open http://localhost:8080')
server.listen(8080)