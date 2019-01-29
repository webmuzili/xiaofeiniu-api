// 小肥牛扫码点餐系统API子系统
// console.log("准备启动api服务器")
// console.log(new Date().toLocaleString())
// const PORT=8090;
// const exprss=require('express');

// // 创建http应用服务器
// var app=express();
// app.listen(8090,()=>{
//     console.log('api 服务器启动成功');
// });
var express = require('express')
var app = express()
const cors=require('cors');
const bodyParser=require('body-parser')
app.listen(8090,()=>{
    console.log('api 服务器已启动')
})

//使用中间件
app.use(cors());
//app.use(bodyParse.urlenocoded({}))
app.use(bodyParser.json());//把json数据格式的请求主体数据解析出来放入req.body属性
//挂载路由器
const categoryRouter=require('./routers/admin/category')
app.use('/admin/category',categoryRouter);

const adminRouter=require('./routers/admin/admin')
app.use('/admin',adminRouter);

const dishRouter=require('./routers/admin/dish')
app.use('/admin/dish',dishRouter);
