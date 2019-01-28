/*
*
*管理员路由
*/
const express=require('express')
const pool=require('../../pool');
var router=express.Router();
module.exports=router;

/*完成用户登录验证
*API:GET /admin/login/:anme/:apwd 
*完成用户登录验证(提示：有的项目用POST)
*请求数据:{aname:XX,apwd:'XXX'}
*返回的数据:{code:200,msg:"login succ"} {code:400,msg:"anme or apwd err"}
*/

router.get('/login/:aname/:apwd',(req,res)=>{
    var aname=req.params.aname;
    var apwd=req.params.apwd;
    //需要对用户的密码执行价加密函数
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
        if(err) throw err
        if(result.length>0){//查询到一行数据
            res.send({code:200,msg:"login succ"})
        }else{//没有查询到数据
            res.send({code:400,msg:"aname or apwd err"})
        }
    })
})

/*根据管理员名和修改管理员密码  修改部分数据用PATCH
*API: PATCH/admin
*请求数据:{aname:XX,oldapwd:'XXX',newapwd:'XXX'}
*返回的数据:{code:200,msg:"modified succ"} {code:400,msg:"aname or apwd err"} {code:401,msg:"apw not modified}
*/
router.patch('/',(req,res)=>{
    var data=req.body
    //首先根据aname /oldname查询该用户是否存在
    //如果查询到用户，再做修改
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
        if(err) throw err
        console.log(result)
        if(result.length==0){
            res.send({code:400,msg:"password err"})
            return;
        }
        //如果查询到了用户，在修改密码
        pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
            if(err) throw err;
           
            if(result.changedRows>0){//密码修改完成
                res.send({code:200,msg:"modeify succ"})
            }else{//新旧密码未做修改
                res.send({code:401,msg:"pwd not modeify"})
            }
       })
    })
})

