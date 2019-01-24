'use strict';
var sha1 = require('sha1');
var mongoose = require('mongoose'),
    users = mongoose.model('users'),
    Products = mongoose.model('products');

exports.add_user = function (req, res) {    
            var doc = new users({ name: req.body.name, password: sha1(req.body.password), real_password: req.body.password, email: req.body.email,  });
    doc.save(function (err, admin) {
        if (err) {
            res.send(err);
        } else {
            res.json({result:"success",data:admin});
        }
    });
};

//product 
exports.listproduct = function (req, res) {   
    Products.find({status:"0"},function (err, task) {
                if (err){
                    res.send(err);
                }else{
                    res.json({result:"success",data:task})      
                }                          
            });
};

exports.login = function (req, res) {
    users.findOne({ email: req.body.email, password: sha1(req.body.password) }, function (err, admin) {
        if (err) {
            res.send(err);
        } else {
            if (admin == null) {
                res.status(400);
                res.json({result:"Invalid"});
            } else {               
                    res.json({ result: "success",data:admin});
            }
        }
    });
};

exports.list_user = function (req, res) {   
            users.find(function (err, task) {
                if (err){
                    res.send(err);
                }else{
                    var list=[]
                    for(let i=0;i<task.length;i++){
                        list.push({ _id: task[i]._id, name: task[i].name, email: task[i].email,status:task[i].status})
                    }
                }
                    res.json({result:"success",data:list})              
            });
     
};


exports.addcart = function (req, res) {
    users.find({ _id: req.query._id,},async function (err, admin) {
        if (err) {
            res.send(err);
        } else {
           var arr=[];
           arr=admin[0].cart
           arr.push(req.params._id)
var new_task = ({     
    cart:arr,
 }); 
 var upd= await users.findOne({_id:req.query._id,cart:[req.params._id]}).exec();
if(upd==null || upd==undefined || upd==[]){
    var update= await users.findOneAndUpdate({_id:req.query._id},new_task,{new: true}).exec();
    if(update!=null ||update!=undefined ||update !=[]){
        res.json({result:"success"})
    }
}else{
    res.json({result:"success"})
}

        }
    });
};

exports.usercart = function (req, res) {
    users.find({ _id: req.params._id,},async function (err, admin) {
        if (err) {
            res.send(err);
        } else {
            var list=[]
      for(var f=0;f<admin[0].cart.length;f++){
          var upd= await Products.find({_id:admin[0].cart[f]}).exec();
        list.push({_id:upd[0]._id,image:upd[0].image})
      }
 
res.json({result:"success",data:list})

        }
    });
};