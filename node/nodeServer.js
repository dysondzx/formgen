var http = require('http')
// 导入querystring模块（解析post请求数据）
var querystring = require('querystring')
var server = http.createServer()
server.on('request', function (req, res) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers","content-type,XFILENAME,XFILECATEGORY,XFILESIZE")
    var url = req.url;
    // 1.通过判断url路径和请求方式来判断是否是表单提交
    if (url == "/parserEval") {
        console.log('进来了')
        //创建空字符叠加数据片段
        var data = ''

        // 2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        })
        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        //注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {

            //（1）.对url进行解码（url会对中文进行编码）
            data = decodeURI(data);
            data = eval('('+data+')')
            console.log(data.methods.submitForm)

            res.end(JSON.stringify(data))
        })
    }
})

server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})