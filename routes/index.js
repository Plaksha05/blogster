const express = require('express');
const router = express.Router();
const Post= require('../models/Post')
const passport= require('passport');

const { ensureAuthenticated }= require('../config/auth');
// Welcome page
router.get('/', (req,res) => res.render('welcome.ejs'))

// Dashboard

router.get('/dashboard', ensureAuthenticated, (req,res) => {

    
    res.render('dashboard.ejs',{
        name:req.user.name
        
    })
    
    
})

router.get('/dashboard/myposts', ensureAuthenticated, (req,res) => {
    
    
    Post.find({name: req.user.name}, function(err, data) {
        
        res.render('myposts.ejs', {
            name : req.user.name,
            data: data
        });
    });
    
    
})

router.get('/dashboard/posts', ensureAuthenticated, (req,res) => {
    
    Post.find({}, function(err, data) {
        res.render('posts.ejs', {
            name : req.user.name,
            data: data
        });
    });
    
    
})

router.post('/dashboard', ensureAuthenticated,  (req,res) => {

    
    let mypost= new Post({
        name: req.user.name,
        title: req.body.title,
        content: req.body.content
    });
    // posts.push(mypost)
    mypost
    .save()
    .then(user => {
        res.redirect('/dashboard/posts');
    })
    .catch(err => console.log(err));
    
    
})

router.get('/dashboard/search', ensureAuthenticated, (req,res) => {
    

    const search_nm=req.session.message;
    // console.log(search_nm);
    Post.find ( {name: search_nm} , function(err,data){
        // if(err) throw esrr;
        // console.log(data);
        
        res.render('myposts.ejs',{
            name: req.body.search_nm,
            data: data
        })
    })
})

router.post('/dashboard/search', ensureAuthenticated, (req,res) =>{
    // console.log(req.body.search_name);
    req.session.message=req.body.search_name;
    res.redirect('/dashboard/search');
})


module.exports = router;