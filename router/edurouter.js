const express = require('express');
const users = require("../model/user");
const services = require('../model/services');
const cources = require('../model/cources');

router = express.Router();

router.get('/', async (req,res)=>{
    try{
        res.render('home',{ title:'EDU Connect' });
    }
    catch(err){
        console.log(err);
    }
});

router.get("/login",(req,res)=>{
    res.render("login",{title:"Register here..."});
    console.log("artist");

});

router.post('/signup', async (req,res)=>{
    // get details
    const email = req.body.email;
    const role = 0;
    

    const recchk = await users.findOne({ email });
    if(recchk){
        return res.status(401).json({message: "Email already exist" });
    }

    const user = new users({
        fullname: req.body.fullname,
        email,
        password: req.body.password,
        role,
    });
    
    user.save().then(()=>{
        req.session.message = {
            type: "success",
            message: "user registered successfully",
        };
        res.redirect("/login");
    }).catch((err)=>{
        res.json({ message: err.message });
    });
        
    
});

router.post('/login', async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email,password);
        const user = await users.findOne({$and: [{ email }, { password }],}); // Replace with your authentication logic

        if (user) {
            req.session.loggedin = true;
            req.session.userId = user._id; 
            if(user.role == 1){
                req.session.user = "admin";
                res.redirect('/admin');    
            }
            else{
                req.session.user = "user";
                res.redirect('/');
            }
        }else {
            res.status(401).send('Invalid username or password');
        }
    }
    catch(error){
        res.send(error);
    }
})

router.get('/computer_courses', async (req,res)=>{
    try{
        res.render('computer_courses',{ title:'EDU Connect' });
    }
    catch(err){
        console.log(err);
    }
});

router.get('/gate', async (req,res)=>{
    try{
        res.render('gate',{ title:'EDU Connect' });
    }
    catch(err){
        console.log(err);
    }
});

router.post('/addService', async (req,res)=>{
    
    const service = new users({
        serName: req.body.serName,
        serImg: req.body.imgPath,
    });
    
    service.save().then(()=>{
        req.session.message = {
            type: "success",
            message: "service added successfully",
        };
        res.redirect("/showService");
    }).catch((err)=>{
        res.json({ message: err.message });
    });
})

router.get('/showService', async (req,res)=>{
    
    try {
          const allServices = await services.find();
          res.render('showServices',{ allServices })
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching applied jobs'); // Handle errors gracefully
    }
    
})

router.post('/addCources', async (req,res)=>{
    
    const cource = new users({
        serName: req.body.serName,
        cName: req.body.cname,
        cImg: req.body.imgPath,
        cvideo: req.body.videopath,
        vcnt: req.body.vcnt,
    });
    
    cource.save().then(()=>{
        req.session.message = {
            type: "success",
            message: "cource added successfully",
        };
        res.redirect("/showCources");
    }).catch((err)=>{
        res.json({ message: err.message });
    });
})

router.get('/showCources', async (req,res)=>{
    
    try {
          const allCource = await cources.find();
          res.render('showCources',{ allCource })
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching applied jobs'); // Handle errors gracefully
    }
    
})

module.exports = router;