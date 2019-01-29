/*
*
*菜品路由
*/
const express=require('express')
const pool=require('../../pool');
var router=express.Router();
module.exports=router;

/*
*
*api:GET /admin/dish
*获取返回数据（按类别进行分类）
*[{cid:1,canme:"肉类",dishLsit:[{},{}]}]
*[{cid:2,canme:"菜类",dishLsit:[{},{}]}]
*/

router.get("/",(req,res)=>{
    //查询所有的菜品的类型
    pool.query('SELECT cid,cname FROM xfn_category',(err,result)=>{
        if(err) throw err;
        var categoryList=result;
        var finshCount=0;
        for(let c of categoryList){
            //循环查询每一种不同的类别,查询该类别下那些菜品
            pool.query('SELECT * FROM xfn_dish  WHERE categoryId=? ORDER BY did DESC',c.cid,(err,result)=>{
                if(err) throw err;
                c.dishList=result;
                finshCount++;
                if(finshCount==categoryList.length){
                    //所有保证所有的类别下的菜品查询完成才能发送响应消息--这些查询是异步执行的
                    res.send(categoryList) 
                }   
            })
        }
    })
})

/*
*POST /admin/dish/image
*请求参数:
*接受客户端上传菜品的图片，保存在服务器上，返回该图片在服务器上的随机文件名
*{code:200,msg:'upload succ'}
*/
//引入multer中间件
const multer=require('multer');
const fs=require('fs');
var upload=multer({dest:'tmp/'}) //指定客户端上传的文件临时路径
//定义：路由使用文件上传中间件
router.post('/image',upload.single('dishImg'),(req,res)=>{
    // console.log(req.file);//客户端上传的图片
    // console.log(req.body);//客户端随同图片提交的字符数据
    //把客户端上传的文件从临时的目录转移到永久的图片路径下
    var tmpFile=req.file.path;//临时文件
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'))
    //原始文件的后缀部分
    var newFile=randFileName(suffix);//目标文件名
    fs.rename(tmpFile,'img/dish/'+newFile,()=>{
        res.send({code:200,msg:'upload succ',fileName:newFile});//把临时文件转移
    })
})
//生成随机的文件名
//参数：suffix表示生成的文件名中的后缀
//形如：32165465-8821.jpg
function randFileName(suffix){
    var time=new Date().getTime();
    var num=Math.floor(Math.random()*(10000-1000)+1000)//四位的随机数
    return time+'-'+num+suffix;
}

/*
*POST /admin/dish
*请求参数:{title:'xx,imgUrl:'..jpg',price:xx,detail:'xx',category:xx}
*添加一个新的菜品
*输出消息
*{code:200,msg:'dish added succ',dishId:46}
*/
router.post('/',(req,res)=>{
    var data=req.body;
    pool.query('INSERT INTO xfn_dish SET ?',data,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'dish added',dishId:result.insertId})//将insert语句产生的自增编号输出给客户端
    })
    
})

/*
*DELETE /admin/dish/:did
*根据菜品的编号删除该菜品
*输出数据
* {code:200,msg:"dish deleted succ"}
* {code:400,msg:"dish not exists"}
*
*/

/*
*PUT/admin/dish
*请求参数:{did:xx,title:"xx",imgUrl:'...jpg,price:xx,detail:"xx",category:"xx"'}
*根据菜品的编号修改该菜品
*输出数据
* {code:200,msg:"dish updated succ"}
* {code:400,msg:"dish not exists"}
*
*/
// router.put('/',(req,res)=>{
//     var data=req.body;
//     //TODO:此处可以对数据进行验证
//     pool.query('UPDATE xfn_category SET ? WHERE cid=?',[data,data.cid],(err,result)=>{
//             if(err) throw err
//             if(result.updatedRows>0){//实际更新了一行
//                 res.send({code:200,msg:'1 category modified'})
//             }else if(result.affectedRows==0){
//                 res.send({code:400,msg:'category not exists'})
//             }else if(result.affectedRows==1&&result.changedRows==0){//影响到1行，但修改0行--新值与旧值一样
//                 res.send({code:401,msg:"no category modified"})  
//             }
//     })
// })