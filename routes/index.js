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
    
    console.log(req.user.name)
    Post.find({name: req.user.name}, function(err, data) {
        console.log(data);
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

router.post('/dashboard/search', ensureAuthenticated, (req,res) =>{
    
    Post.find ( {name: req.body.search_name} ), function(err,data){
        res.render('myposts.ejs',{
            name: req.body.search_name,
            data: data
        })
    }
})


module.exports = router;