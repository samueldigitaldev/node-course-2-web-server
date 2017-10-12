// const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
//uses either environment port or local
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
//this lets us set express configurations
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		/*if (err){
			console.log('Unable to append to server.log.');
		}*/
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


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
//binds app to port on machine
//uses port that binds to environment of machine

//git notes
//git init to make the hidden git file but can be found with ls -a
//git status to see added and committed
//git add server.js
//git commit -m 'Initial Commit'
//ls al ~/.ssh ls prints all files in a given directory and this checks whether or not you have an ssh key
//ssh-keygen -t rsa -b 4096 -C 'samuelwlai@gmail.com'
//ls al ~/.ssh


//eval "$(ssh-agent -s)"
//ssh-add ~/.ssh/id_rsa
//pbcopy < ~/.ssh/id_rsa.pub
//ssh -T git@github.com


//package.json - heroku runs the start script which runs server.js as heroku doesnt know about server.js

//heroku
//heroku --help
//heroku login
//heroku keys:add this scans the ssh directories for keys
//heroku keys - to check 
//ssh -v git@heroku.com

//git add .
//git commit -m 'Setup start script and heroku port'
//git push

//heroku create
//git push heroku



