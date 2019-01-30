/*
*桌台相关的路由器
*/
const express=require('express')
const pool=require('../../pool');
var router=express.Router();
module.exports=router;

//获取所有的桌台数据

router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_table ORDER BY tid',(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
