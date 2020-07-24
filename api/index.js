const express = require('express');
var conn = require("../db/index.js");
const index = require('../constants/index');
// console.log(index);
var router = require('express').Router()
var md5 = require('md5');
var QRCode = require('qrcode');
const ip = require('ip');
console.log(ip.address());
// const { response } = require('express');

router.get('/',(req,res) => {

})

router.post('/login',(req,res) => {
    let mobile = req.body.mobile;
    let pass = req.body.pass;

    // console.log(mobile,pass);
    if(!mobile || !pass){
        return res.send({'status':'failed','msg':'mobile and pass is required'}).status(400)
    }
    let md5haspass = md5(pass);
    let sql = `call sql12356338.check_login('${mobile}','${md5haspass}')`
    console.log(sql);
    var response;
    conn.query(sql,(err,result)=>{
        if(err) res.status(400).send(err)

        // console.log(result[0][0])
        if(result[0][0].status=='success'){
            response = index.statusSuccess;
            response.msg=result[0][0].msg
            response.res=result[0][0]
            return res.send(response).status(200);
        }else{
            response = index.statusFailed;
            response.msg=result[0][0].msg
            response.res=null
            return res.send(response).status(200);;
        }
    })

})

router.post('/register',(req,res)=>{
    let mobile = req.body.mobile;
    let pass = req.body.pass;
    let society_id = req.body.society_id;
    let name = req.body.name;

    console.log(mobile,pass,society_id,name);
    if(!mobile || !pass || !society_id || !name){
        return res.send({'msg':'All fields are required'}).status(400)
    }
    let md5haspass = md5(pass);
    let sql = `call sql12356338.create_registeration('${name}','${mobile}','${md5haspass}','${society_id}')`
    console.log(sql);
    var response;
    conn.query(sql,(err,result)=>{
        if(err) res.status(400).send(err)

        // console.log(result[0][0])
        if(result[0][0].status=='true'){
            response = index.statusSuccess;
            response.msg=result[0][0].msg
            response.res=result[0][0]
            return res.send(response).status(200);
        }else{
            response = index.statusFailed;
            response.msg=result[0][0].msg
            response.res=null
            return res.send(response).status(200);
        }
    })
})


router.post('/generate-barcode',(req,res)=>{
    let society_id = req.body.society_id;

    console.log(society_id);
    if(!society_id){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    var segs = [
        { data: society_id, mode: 'numeric' }
      ]
      
      QRCode.toDataURL(segs, function (err, url) {
        let sql = `update sql12356338.socities set barcode='${url}' where id=${society_id}`;
        conn.query(sql,(error,result)=>{
            if (error) res.send(error).status(500);

            res.send(index.statusSuccess).status(200);
        })
    })
})

router.post('/get-barcode',(req,res)=>{
    let society_id = req.body.society_id;

    console.log(society_id);
    if(!society_id){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    let sql = `select * from sql12356338.socities where id=${society_id}`;
    conn.query(sql,(error,result)=>{
        if (error) res.send(error).status(500);

       if(result == null){
        res.send(index.statusFailed).status(200);
       }else{
           var response = index.statusSuccess;
            response.res = result;
            res.send(response).status(200);
       }
    })
})

router.post('/log/entry',(req,res)=>{
    let user_id = req.body.user_id;
    let society_id = req.body.society_id;
    let logDetails = 0;

    console.log(user_id,society_id);
    if(!user_id || !society_id){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    let sql = `insert into sql12356338.log_entries(user_id,society_id,log_details,sysdate,ip) values(${user_id},${society_id},${logDetails},NOW(),'${ip.address()}')`;
    conn.query(sql,(error,result)=>{
        if (error) res.send(error).status(500);

        var response = index.statusSuccess;
            response.res = true;
            res.send(response).status(200);
    })
})


router.post('/log/exit',(req,res)=>{
    let user_id = req.body.user_id;
    let society_id = req.body.society_id;
    let logDetails = 1;

    console.log(user_id,society_id);
    if(!user_id || !society_id){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    let sql = `insert into sql12356338.log_entries(user_id,society_id,log_details,sysdate,ip) values(${user_id},${society_id},${logDetails},NOW(),'${ip.address()}')`;
    conn.query(sql,(error,result)=>{
        if (error) res.send(error).status(500);

        var response = index.statusSuccess;
            response.res = true;
            res.send(response).status(200);
    })
})

router.post('/getlog',(req,res)=>{
    let user_id = req.body.user_id;

    if(!user_id){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    let sql = `select le.*,sc.socities_name,sc.socities_area,sc.socities_city,u.name,u.mobile from sql12356338.log_entries le left join sql12356338.socities sc on (sc.id = le.society_id) left join sql12356338.user u on u.id = le.user_id where u.id=${user_id}`;

    conn.query(sql,(error,result)=>{
        if (error) res.send(error).status(200)

        if(result !== null){
            var response = index.statusSuccess;
            response.res = result
            res.send(response).status(200);
        }else{
            res.send(index.statusFailed).status(200);
        }
    })
   
})


router.post('/getfilterdata',(req,res)=>{
    let user_id = req.body.user_id;
    let startDate = req.body.start_date;
    let endDate = req.body.end_date;

    if(!user_id && !startDate && !endDate){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    let sql = `select le.*,sc.socities_name,sc.socities_area,sc.socities_city,u.name,u.mobile from sql12356338.log_entries le left join sql12356338.socities sc on (sc.id = le.society_id) left join sql12356338.user u on u.id = le.user_id where u.id=${user_id} and date(le.sysdate) BETWEEN '${startDate}' and '${endDate}'`;

    conn.query(sql,(error,result)=>{
        if (error) res.send(error).status(200)

        console.log(result);
        if(result !== null){
            var response = index.statusSuccess;
            response.res = result
            res.send(response).status(200);
        }else{
            res.send(index.statusFailed).status(200);
        }
    })
   
})

router.post('/verify-otp',(req,res)=>{
    let user_id = req.body.user_id;
    let otp = req.body.otp;
    if(!user_id && !otp){
        return res.send({'msg':'All fields are required'}).status(400)
    }

    let sql = `call sql12356338.otp_verify('${user_id}','${otp}')`;

    conn.query(sql,(error,result)=>{
        if (error) res.send(error).status(200)

        // console.log(result);
        if(result[0][0].status == 'success'){
            var response = index.statusSuccess;
            response.res = result[0]
            res.send(response).status(200);
        }else{
            var response = index.statusSuccess;
            response.res = result[0]
            res.send(response).status(200);
        }
    })
   
})

module.exports = router