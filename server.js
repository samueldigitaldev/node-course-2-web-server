const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
//this lets us set express configurations
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('Unable to append to server.log.');
		}
	});

	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
//this stops everything else from executing

app.use(express.static(__dirname + '/public'));
//middleware lets you configure how your express app works, think of it like an addon

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
//this is a handlebar helper

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
//go to home.hbs and see how it is called

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to my Message",
		currentYear: new Date().getFullYear()
	});

// first is url which is the root of the app, second function that tells express what to send back
// 	res.send('<h1>hello express</h1>');
// this is response for http request
// 	res.send({
// 		name: "Sam",
// 		likes: [
// 		"test1", 
// 		"test2"
// 		]

});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "Unable to navigate"
	});

});


app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
//binds app to port on machine

