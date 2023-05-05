var con = require('../config/config')

const hetHomePage = (req,res)=>{
    let sql ="select * from product"
    con.query(sql,(err,row)=>{
        console.log(row)
        if(err){
            console.log(err)
        }else{
            console.log(req.session.user,"-------")
            if(req.session.user){
                let user = req.session.user;
                let id = user.id;
                console.log(user,"-------")
                let cartQry = "SELECT COUNT (*) as cartNumber  FROM cart where userId = ?;"

                con.query(cartQry,[id],(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result[0].cartNumber,"cart.....")
                        let cart = result[0].cartNumber;
                        res.render('index',{user,row,cart});
                    }
                })
               
            }else{
                res.render('index',{row});
            }
        }
        
    })
    
   
}
const getLoginPage = (req,res)=>{
    res.render('user/login')
}
const getRegisterPage = (req,res)=>{
    res.render('user/register')
}
const getMyorderPage = (req,res)=>{
    let user = req.session.user;
    res.render('user/myOrder',{user})
}
const doRegister = (req,res)=>{
    console.log(req.body)
    let qry = "Insert into user set ?"
    con.query(qry,req.body,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("data inserted!!!")
                    res.redirect('/login')
                }
    })
}
const doLogin = (req,res)=>{
        console.log(req.body)
        let {email} =req.body;
        let {password} = req.body;
        let sql="select * from user where email = ? and password = ?"
        con.query(sql,[email,password],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
                if(result.length >0){
                    console.log("login success")
                    req.session.user = result[0];
                    console.log(req.session.user,"from session data")
                    res.redirect('/')
                }else{
                    console.log("login error")
                    res.redirect('/login')

                }
            }
        })

}
const logout =(req,res)=>{
    req. session.destroy();
    res.redirect('/')
}
const addTocart =(req,res)=>{
        let ProductId = req.params.Pid;
        let userId = req.session.user.id;
        let query1 = "select * from cart where ProductId = ? and userId = ?"
        con.query(query1,[ProductId,userId],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length>0){
                        var qty = result[0].qty;
                        let cartID = result[0].id;
                            qty = qty+1;
                            let qry2 =  "update cart set qty = ? where id = ?"
                            con.query(qry2,[qty,cartID],(err,row)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    res.redirect('/')
                                }
                            })
                    }else{
                       let qry3 = "insert into cart set ?"
                       let data = {
                        ProductId,
                        userId
                       }
                       con.query(qry3,data,(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                res.redirect('/')
                            }
                       }) 
                    }
                }
        })
        
}
module.exports = {
    hetHomePage,
    getLoginPage,
    getRegisterPage,
    doRegister,
    doLogin,
    getMyorderPage,
    addTocart,
    logout
}