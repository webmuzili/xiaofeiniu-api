// 小肥牛扫码点餐系统API的子系统
const PORT=8090;
const exprss=require('express');

//启动服务器
var app=express();
app.listen(PORT,()=>{
    console.log('Sever Listening'+PORT+'...');
});


