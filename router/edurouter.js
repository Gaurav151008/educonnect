const express = require('express');

router = express.Router();

router.get('/', async (req,res)=>{
    try{
        res.render('home',{ title:'EDU Connect' });
    }
    catch(err){
        console.log(err);
    }
});

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

module.exports = router;