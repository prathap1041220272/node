'use strict'
//express
const express = require('express');
const app = express();
//mongoose
const mongoose = require('mongoose');
const Users = require('./schema.js');

//body-parser 
const bodyParser = require('body-parser');
const port =3330;

//initiating schema.js in mongoose
mongoose.connect('mongodb://localhost/students', (err)=>{
	if (err) {
		console.log('DB Not Connected')
	} else {
		console.log('DB Connected')
	}
})
  
  //initiating body parser in app
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());


  app.post("/", (req, res)=>{
  	var user = new Users();
  	user.name = req.body.name;
  	user.age = req.body.age;
  	user.save( (err)=>{
  		if (err) {
  			console.log("user not saved")
  		} 
  			res.json({msg : "user save"})
  		  	})
  })

  app.get("/", (req, res)=>{
  	Users.find((err,docs)=>{
  		if (err) {
  			console.log("user not find")
  		}
  		res.json(docs)
  	})
  })


 app.get("/:id", (req, res)=>{
 	var id = req.params.id
  	Users.findById({_id : id},(err,doc)=>{
  		if (err) {
  			console.log("user not find")
  		}
  		res.json(doc)
  	})
  })

app.delete("/:id", (req, res)=>{
 	var id = req.params.id
  	Users.findByIdAndRemove({_id : id},(err,doc)=>{
  		if (err) {
  			console.log("user not find")
  		}
  		res.json(doc)
  	})
  })

app.put("/:id", (req, res)=>{
 	var id = req.params.id
 	var data = {
 		name : req.body.name,
 		age : req.body.age
 	}
  	Users.findByIdAndUpdate(id, data , {new : true}, (err,doc)=>{
  		if (err) {
  			console.log("user not find")
  		}
  		res.json(doc)
  	})
  })

//listen to the port 
app.listen(port,(err)=> {
if (err) {
	console.log("Server Failed to start");
}
console.log("Server started at port "+port);
	} );
