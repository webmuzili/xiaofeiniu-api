//菜品类别相关的路由
//创建路由器
const express=require('express');
const pool=require('../../pool');
var router=express.Router();

/*API :GET/admin/category RESTful 客户端获取所有的菜品类别 ，那菜品类别标号升序排列 返回形如 [{cid:1,code:"...",{}}]
*/

router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_category ORDER BY cid',(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

/*API :DELETE/admin/category/:cid
 含义：根据菜品编号路由参数，删除该菜品 
 返回形如：{code:200,msg:'1 category deleted'}  {code:400,msg:'0 category deleted'}
*/

router.delete('/:cid',(req,res)=>{
    //删除菜品类别前必须把属于该类别的菜品类别编号设置NULL

    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?',req.params.cid,(err,result)=>{
        if(err) throw err
        //获取DELETE  语句在数据库中影响的行数
        pool.query('DELETE FROM xfn_category WHERE cid=?',req.params.cid,(err,result)=>{
            if(err) throw err
            //获取DELETE  语句在数据库中影响的行数
            if(result.affectedRows>0){
                res.send({code:200,msg:'1 category deleted'})
            }else{
                res.send({code:400,msg:'0 category deleted'})
            }
        })
    })
    
})

/*API :POST/admin/category  幂等
请求参数:{cname:"xxx"}
含义： 添加新的菜类别
返回形如: {code:200,msg:'1 category deleted'}  {code:400,msg:'0 category deleted'}
*/

router.post('/',(req,res)=>{
    
    var data= req.body //{cname:xxx}
    pool.query('INSERT INTO xfn_category SET ?',data,(err,result)=>{//此处有json格式的简写
        if(err) throw err
        res.send({code:200,msg:'1 category added'})
    })
})

/*API :PUT/admin/category
请求参数:{cis:xx,cname:"xxx"}
含义： 根据菜品类别编号修改类别
返回形如: {code:200,msg:'1 category modified'}{code:400,msg:'0 category modified,not exists'}{code:401,msg:'0 category modified,no modifcation'}
*/

router.put('/',(req,res)=>{
    var data=req.body;
    //TODO:此处可以对数据进行验证
    pool.query('UPDATE xfn_category SET ? WHERE cid=?',[data,data.cid],(err,result)=>{
            if(err) throw err
            if(result.updatedRows>0){//实际更新了一行
                res.send({code:200,msg:'1 category modified'})
            }else if(result.affectedRows==0){
                res.send({code:400,msg:'category not exists'})
            }else if(result.affectedRows==1&&result.changedRows==0){//影响到1行，但修改0行--新值与旧值一样
                res.send({code:401,msg:"no category modified"})  
            }
    })
})

module.exports=router;