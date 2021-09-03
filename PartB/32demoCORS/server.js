// 1.启动服务器 node server.js
// 2.访问127.0.0.1:8080/index.html  进行测试 使用localhost:8080 测试跨域
// 3.取消[访问控制允许的域] 重启服务器,重复测试
// 4.同上,测试[允许所有]

var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

http
  .createServer(function (req, res) {
    var pathObj = url.parse(req.url, true);

    switch (pathObj.pathname) {
      case "/getNews":
        var news = [
          "第11日前瞻：中国冲击4金 博尔特再战200米羽球",
          "正直播柴飚/洪炜出战 男双力争会师决赛",
          "女排将死磕巴西！郎平安排男陪练模仿对方核心",
        ];

        //访问控制允许的域
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

        //允许所有
        //res.setHeader('Access-Control-Allow-Origin','*')

        res.end(JSON.stringify(news));
        break;
      default:
        fs.readFile(path.join(__dirname, pathObj.pathname), function (e, data) {
          if (e) {
            res.writeHead(404, "not found");
            res.end("<h1>404 Not Found</h1>");
          } else {
            res.end(data);
          }
        });
    }
  })
  .listen(8080);
