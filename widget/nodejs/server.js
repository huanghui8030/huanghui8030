var httpserver = require("http");
var qs = require("querystring");
var url = require("url");
var util = require('util');
var fs = require("fs");

var FileJson = "file/file.json";//写入内容的文件

httpserver.createServer(onRequest).listen(3000);

function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    if(pathname=="/" || pathname=="/list.html"){//访问列表页面
        response.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile("list.html","utf-8",function(e,data){
            response.write(data);
            response.end();
        });
    }else if(pathname=='/file/file.json'){//访问json文件
        response.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile(FileJson,"utf-8",function(e,data){
            response.write(data);
            response.end();
        });

    }else if(pathname=='/add' || pathname=='/add.html'){//访问列表页面
        response.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile("add.html","utf-8",function(e,data){
            response.write(data);
            response.end();
        });
    }else if(pathname=="/addpage"){//添加页面功能
        var urlstr="";
        request.addListener("data",function(postdata){
            urlstr+=postdata;    //接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            var jsondata = qs.parse(urlstr);        //转换成json对象
            
            jsondata.updatetime = new Date().Format("yyyy-MM-dd hh:mm:ss");//更新时间

            var dataArr = fs.readFileSync(FileJson,'utf-8') ; 
            
            var fileDate=[];
                size = 0;
            if(dataArr !=''){
                fileDate = eval("("+dataArr+")");  //string 类型转为 数组类型
                size = fileDate.length ;
            }

            console.log(fileDate);
            console.log("size:"+size);

            jsondata.id = new Date().getTime(); //序号，唯一标识

            
            fileDate[size] = jsondata;
            urlstr = JSON.stringify(fileDate);

            fs.writeFile(FileJson,urlstr,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
                 if(err){
                     console.log("文件内容添加写入失败！")
                 }else{
                     console.log("文件内容添加写入成功！");
                 }
            }) 
        });
        request.addListener("end",function(){
            console.log('添加成功！');
            response.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});
            response.write('添加成功！');
            response.end();
        });
    }else if(pathname=='/updatepage'){//修改
        var urlstr = '';
        request.addListener("data",function(postdata){
            urlstr+=postdata;    //接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            var jsondata = qs.parse(urlstr);        //转换成json对象
            var id = jsondata.id;
            jsondata.updatetime = new Date().Format("yyyy-MM-dd hh:mm:ss");//更新时间
            console.log("修改的数据-------"+jsondata);
            var dataArr = fs.readFileSync(FileJson,'utf-8') ; //去读文件
            
            var fileDate=[];
                size = 0;
            if(dataArr !=''){
                fileDate = eval("("+dataArr+")");  //string 类型转为 数组类型
                size = fileDate.length ;
            }
            console.log(fileDate[0].id);
            console.log("size:"+size);

            /*//遍历已有数据，取出需要修改的数据，进行替换
            for (var i = 0; i < size; i++) {
                if(fileDate[i].id==id){
                    fileDate[i] = jsondata;
                    break;
                }
            }
            console.log(fileDate.length);
            
            urlstr = JSON.stringify(fileDate);

            fs.writeFile(FileJson,urlstr,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
                 if(err){
                     console.log("文件内容修改写入失败！")
                 }else{
                     console.log("文件内容修改写入成功！");
                 }
            }) */
        });
        request.addListener("end",function(){
            response.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});
            response.write('单个修改成功！');
            response.end();
        });
    }else if(pathname=='/update' || pathname=='/update.html'){//访问列表页面
        var urlstr = '';
        request.addListener("data",function(postdata){
            urlstr+=postdata;    //接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            var jsondata = qs.parse(urlstr);        //转换成json对象
            var id = jsondata.id;
            console.log("修改的数据-------"+id);
            var dataArr = fs.readFileSync(FileJson,'utf-8') ; //去读文件
            
            var fileDate=[];
                size = 0;
            if(dataArr !=''){
                fileDate = eval("("+dataArr+")");  //string 类型转为 数组类型
                size = fileDate.length ;
            }
            console.log(fileDate[0].id);
            console.log("size:"+size);

            //遍历已有数据，取出需要修改的数据，进行替换
            for (var i = 0; i < size; i++) {
                if(fileDate[i].id==id){
                    urlstr = fileDate[i];
                    break;
                }
            }
            console.log(urlstr);
        });
        fs.readFile("update.html","utf-8",function(e,data){
            console.log('upate___________'+urlstr.name);//返回数据
            //response.write(urlstr);
            //response.setHeader("name", urlstr.name);
           // response.setHeader("pageurl", urlstr.url);
            //console.log(urlstr.businesstype);
           // response.writeHead(urlstr);

           // var dataJson = JSON.stringify(urlstr);
           // response.setHeader("dataJson", dataJson);
            response.write(data);
            console.log(1);
            //response.end();
        });
        console.log(2);
        request.addListener('end', function(data){ 
            console.log(3);   
            var post = qs.parse(urlstr);
            console.log(4);
            response.end(util.inspect(post));
            console.log(5);
        });

    }else if(pathname=='/deleteonly'){//单个删除
        var urlstr = '';
        request.addListener("data",function(postdata){
            urlstr+=postdata;    //接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            var jsondata = qs.parse(urlstr);        //转换成json对象
            var id = jsondata.id;
            jsondata.updatetime = new Date().Format("yyyy-MM-dd hh:mm:ss");//更新时间

            var dataArr = fs.readFileSync(FileJson,'utf-8') ; 
            
            var fileDate=[];
                size = 0;
            if(dataArr !=''){
                fileDate = eval("("+dataArr+")");  //string 类型转为 数组类型
                size = fileDate.length ;
            }
            console.log(fileDate[0].id);
            console.log("size:"+size);

            //遍历已有数据，取出需要修改的数据，进行单个删除。记住需要break，否则会报错
            for (var i = 0; i < size; i++) {
                if(fileDate[i].id==id){
                    fileDate.splice(i,1);
                    break;
                }
            }
            console.log(fileDate.length);
            
            urlstr = JSON.stringify(fileDate);

            fs.writeFile(FileJson,urlstr,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
                 if(err){
                     console.log("文件内容删除写入失败！")
                 }else{
                     console.log("文件内容删除写入成功！");
                 }
            }) 
        });
        request.addListener("end",function(){
            response.writeHead(200,{"Content-Type":"text/plain; charset=utf-8"});
            response.write('单个删除成功！');
            response.end();
        });
    }else{
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("error");
        response.end();
    }
}

//日期格式化
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


