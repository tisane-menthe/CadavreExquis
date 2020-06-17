
//import express
const express = require('express');
const app = express();

//import nedb
const Datastore = require('nedb'); 

const port = process.env.PORT || 3000;
//specify the port that the server will listen
app.listen(port, () => console.log(`listening at ${port}`));
//Serve the html index found in 'public' directory.
app.use(express.static('public'));
//tell express to use JSON to communicate.
app.use(express.json({limit: '1mb'}));

// create new Datastore / nedb object. The DB will be stored in the server at the path specified .db
const database = new Datastore('wordDB.db');
const imageMemory = new Datastore('imageDB.db');

//Function to either initialize or load the DB. 
database.loadDatabase();
imageMemory.loadDatabase();

//lisent to request made to /api, and speficy what to do with the response.
// This is to receive word input and X and Y post.
app.post('/api', (request, response) => {
	console.log("Request received.")
	console.log(request.body); 
	const data = request.body;
	database.insert(data);
	response.json({
	status: 'success',
	data
});
}); 

app.post('/dbUpdate', (request, response) => {
	console.log(request.body); 
	const data = request.body;

	console.log("This is the word that has been updated: ", data.updatedWord);
	database.update( {wordIn: data.updatedWord}, {$set: {someX: data.updateX, someY: data.updateY}}, {}, function (err, numReplaced){
		//What?
	} );
	response.json({
	status: 'success',
	data
});
}); 

app.post('/memory',  (request, response) => {
	console.log("Request received.")
	console.log(request.body); 
	const data = request.body;

	imageMemory.insert(data); 

	response.json({
		status: 'success',
		data
	});

});

// to answer the request from client to have 
app.get('/api', (request, response) => {
//	response.json({test: 123});
	database.find({}, (err, data) => {
			response.json(data);
	});
});

app.get('/memory', (request, response) => {
//	response.json({test: 123});
	imageMemory.find({}, (err, data) => {
			response.json(data);
	});
});