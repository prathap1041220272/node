const express = require('express');		
const app = express();
const bodyParser = require('body-parser');


const port = 3210;

const cors = require('cors')
//mongoose	
const mongoose = require('mongoose');
const Book = require('./schema');
app.use(cors())
//body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//mongoose database
mongoose.connect('mongodb://localhost/test',(err)=>{
	if (err) {
		console.log('db is not connected')
	}
	else {
		console.log('db connected')
	}
})


//crud operations
app.get('/api/books',function(req,res){
	Book.find({})
	.then(books => {
		res.json(books)
	})
})


app.post('/api/books', function (req, res, next) {
	console.log(req.body)
	const { name, price } = req.body;
	const book = new Book({ name, price });
	book.save()
	.then(data => res.json(data))
	.catch(next)
})

app.put('/api/books/:id',function (req, res, next) {
	const {id} = req.params;
	const { price } = req.body;
	if (!id) {
		const error = new Error('ID should not be empty');
		return next(error);
	}

	Book.findOneAndUpdate({ _id: id }, {price}, {new: true})
	.then(data => res.json(data))
	.catch(next)
})
	




app.delete('/api/books/:id',function (req,res, next) {
	const {id} = req.params;
	Book.remove({_id: id})
	.then(data => res.json(data))
	.catch(next)

})

app.use((error, req, res, next) => {
	res.status(400).json({message: error.message})
})

app.listen(port, () => console.log('Server Started And Listening At PORT ' + port));