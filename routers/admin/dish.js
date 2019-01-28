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
        var count=0;
        for(var c of categoryList){
            //循环查询每一种不同的类别
            pool.query('SELECT * FROM xfn_dish  WHERE categoryId=?',c.cid,(err,result)=>{
                c.dishList=result;
                count++;
                if(count==categoryList.length){
                    res.send(categoryList) 
                }   
            })
        }
    })
})