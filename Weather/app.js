const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


const port = 3000;


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
	const query = req.body.cityName;
	const apiKey = "7d7a83e2e0ededae962a1513c4976861";
	const unit = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + unit;
	
	https.get(url, (response) => {
		console.log(response.statusCode);
		
	//Get hold of the data from the response
		response.on("data", (data) => {
	//Pass/Convert data into javascript object
	//Store the data using weatherData
			const weatherData = JSON.parse(data)
	//Dig through the javascript object
			const temp = weatherData.main.temp
	//Pieces of javascript data object
			const weatherDescription = weatherData.weather[0].description
		    const icon = weatherData.weather[0].icon
			const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
			res.write("<p>The weather currently is: " + weatherDescription + "</p>");
			res.write("<h1>The temperature in: " + query + " is " + temp + "degress Celcius.</h1>")
			res.write("<img src=" + imageURL +">");
			res.send()
		});
	});
});


app.listen(port, () => {
	console.log("Server running on ${port}");
});