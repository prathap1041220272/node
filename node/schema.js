'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  BookSchema = new Schema({
	name : {type: String, required: [true, 'Name Should Be Provided'], unique :[true, 'this product already exist']},
	price : {type: Number, required: [true, 'Price Should Be Provided']}
})

module.exports = mongoose.model('Book', BookSchema)