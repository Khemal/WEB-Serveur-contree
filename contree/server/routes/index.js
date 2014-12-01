var express = require('express');
var router = express.Router();


//Home page
router.get('/',function(req,res){
	res.render('home',{
		title: "Contree"
	});
});

router.get('/login',function(req,res){
	res.render('login');
});

router.get('/chat',function(req,res){
	res.render('chat');
});


module.exports = router;
