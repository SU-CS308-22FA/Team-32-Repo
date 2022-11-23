var express = require('express');
var router = express.Router();
const  ObjectID = require('mongodb').ObjectId;
const {User,Item} = require('../models/user');





router.get('/register', function (req, res, next) {
	return res.render('index.ejs');
});

var loggedInUser = null;
var currentErr = "";



router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf || !personInfo.teamname){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							teamname: personInfo.teamname
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				loggedInUser = data;  // silme işlemi deneme
				req.session.userId = data.unique_id;
				req.session._id = data._id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.username,"email":data.email, "teamname":data.teamname});
		}
	});
});

router.get('/teamprofile', function (req, res, next) {
	console.log("teamprofile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('teamdata.ejs', {"name":data.username,"email":data.email});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});


router.get('/create_item', function(req,res,next) 
{



	return res.render('items.ejs');

});

router.post(
	'/create_item',
	async function (
	  req,
	  res,
	  next // Try to create items in database
	) {
	  console.log(req.body);
	  try {
		var itemInfo = req.body;
  
		if (
		  !itemInfo.itemname ||
		  !itemInfo.itemdsc ||
		  !itemInfo.itemstock ||
		  !itemInfo.itemprice
		) {
		  return res.send("Incomplete parameters");
		}
  
		const newItem = await Item.create({
		  createrId: loggedInUser._id,
		  productname: itemInfo.itemname,
		  description: itemInfo.itemdsc,
		  price: itemInfo.itemprice,
		  totalStock: itemInfo.itemstock,
		});
  
		const result = await User.findByIdAndUpdate(loggedInUser._id, {
			$push: { items: newItem._id}, // sanırım burası sıkıntılı 
		  },{ new: true } )
			.populate('items')
			.exec();
	
			console.log('Suceess ? : ', result);
			
		
			return res.send("Done");
	  }
	   catch (e) {
		console.log(e);
	  }
	}
  );


router.get('/change',function(req,res)
{

	res.render('change.ejs');

});


router.post('/change',function(req,res) // Change 
{
	User.findOne({email:loggedInUser?.email},function(err,data) // if find email from database
	{
		console.log(data);
		if(!data) // if data can not find 
		
		{
			res.send({"Success":"This Email Is not registered!"});
		}
		
		else
		
		{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) // check given req.body password from inputs then change data accordingly
			{
			data.email = req.body.email;
			data.username = req.body.username;
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;
			data.teamname = req.body.teamname;


			data.save(function(err, Person) // save the data
			{
				if(err)
					console.log(err);
				else
					console.log('Success');

					//res.render("/data.ejs");

					res.send({"Success":"Changed"});
			});

			 loggedInUser = data; // lazım olur 
		}
		else
		{
			res.send({"Success":"Passwords are not matching "});
		}
		}
	});
	

});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not registered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

router.get('/teamlogin', function (req, res, next) {
	return res.render('teamlogin.ejs');
});

router.post('/teamlogin', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
	});
});


router.get('/', function (req, res, next) {
	return res.render('home.ejs');
});

router.get('/teamregister', function (req, res, next) {
	return res.render('teamregister.ejs');
});

router.get('/delete',function(req,res)		// href delete kısmını get ile alıyor
{
	User.deleteOne({email:loggedInUser?.email}).then(function()		// delete operation in database
	{

		console.log("User is deleted");
		loggedInUser = null;
		res.render("home.ejs");	// operasyon tamamlandı home page geri atıyor
	}).catch(function(error)	
	{
		console.log(error); // Failure case
	})
});


router.post('/teamregister', function(req, res, next) {
	console.log(req.body);
	var teamInfo = req.body;


	if(!teamInfo.email || !teamInfo.teamname || !teamInfo.password || !teamInfo.passwordConf ){
		res.send();
	} else {
		if (teamInfo.password == teamInfo.passwordConf) {

			Team.findOne({email:teamInfo.email},function(err,data){
				if(!data){
					var c;
					Team.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newTeam = new Team({
							unique_id:c,
							email:teamInfo.email,
							teamname: teamInfo.teamname,
							password: teamInfo.password,
							passwordConf: teamInfo.passwordConf
							
						});

						newTeam.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/data',function(req,res)
{

	return res.render('data.ejs');
});


router.get('/all_items',function(req,res,next)
{

	Item.find({},function(err,items)
	{
		res.render('all_items.ejs', 
		{
			itemList:items
		})
	})

});



router.get('/your_item', function(req,res,next)
{
	Item.find({createrId:loggedInUser?._id},function(err,items)
	{
		res.render('your_items.ejs', 
		{
			itemList:items
		})
	})

	

});

 /*User.deleteOne({email:loggedInUser?.email}).then(function()		// delete operation in database
	{

		console.log("User is deleted");
		loggedInUser = null;
		res.render("home.ejs");	// operasyon tamamlandı home page geri atıyor
	}).catch(function(error)	
	{
		console.log(error); // Failure case
	})
router.post("/do-delete",function(req,res,next)
{
	var itemid = req.params.id;
    console.log(itemid);
}); */


router.post("/do-delete",function(req,res,next)
{
    var itemid = req.body.id;
    console.log("Item id",itemid);
	var userid = loggedInUser._id;
	console.log("User id",userid);

	Item.findById(itemid,function(err,item) 
	{	
		if(err)
		console.log(err);
		else 
		{	console.log(item);
			Item.deleteOne({_id:ObjectID(itemid),createrId:ObjectID(loggedInUser?._id)}).then(function( err,items) // items dönmüyor 
				{
					console.log("DESTROYED PRODUCT");

					
					Item.find({createrId:loggedInUser?._id},function(err,items)
				{
					res.render('your_items.ejs', 
					{
						itemList:items
					})
				})

					
					
				}).catch(function(error) 
				{
					console.log(error);
				});
			
				
		}
		
	})

});



module.exports = router;