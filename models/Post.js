const express= require('express')
const mongoose= require('mongoose')

const UserPost= new mongoose.Schema({
    
    name: {
        type:String
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

module.exports= mongoose.model('Post', UserPost, 'posts');
