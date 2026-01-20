require('dotenv').config();

//import express
const express = require('express');
const app = express();

const { MongoClient, ObjectId } = require('mongodb'); // import MongoDB

const port = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGO_URI);

//specify the port that the server will listen
app.listen(port, () => console.log(`listening at ${port}`));
//Serve the html index found in 'public' directory.
app.use(express.static('public'));
//tell express to use JSON to communicate.
app.use(express.json({limit: '1mb'}));

// declaring variables used to access Mongo items
let db, wordsColl;

async function initDB() {
	await client.connect();
	db = client.db('cadavreexquis');       // database
	wordsColl = db.collection('words');    // collection for words
}
initDB().catch(console.error);

//lisent to request made to /api, and speficy what to do with the response.
// This is to receive word input and X and Y post.
app.post('/api', async (req, res) => {
	try {
		console.log("Request received.");
		console.log(req.body);
		const data = req.body;

		// Insert the new word into MongoDB
		const result = await wordsColl.insertOne(data);

		res.json({
			status: 'success',
			data
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'error', message: 'Database insert failed' });
	}
});


app.post('/dbUpdate', async (req, res) => {
	try {
		const data = req.body;

		console.log("Update request received:", data);

		// Update the word's position
		const result = await wordsColl.updateOne(
			{ wordIn: data.updatedWord },          // filter
			{ $set: { someX: data.updateX, someY: data.updateY } }  // update
		);

		// result.matchedCount tells us if a document was found
		if (result.matchedCount === 0) {
			return res.status(404).json({ status: 'error', message: 'Word not found' });
		}

		res.json({ status: 'success', data });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'error', message: 'Database update failed' });
	}
});

/*
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
*/


// to answer the request from client to have 
app.get('/api', async (req, res) => {
	try {
		// Fetch all words from the collection
		const allWords = await wordsColl.find({}).toArray();

		// Send them back to the client
		res.json(allWords);
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 'error', message: 'Failed to fetch words' });
	}
});

/*
app.get('/memory', (request, response) => {
//	response.json({test: 123});
	imageMemory.find({}, (err, data) => {
			response.json(data);
	});
});
*/
