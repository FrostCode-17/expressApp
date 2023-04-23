const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/bmiCalculator.html");
});

//POST ROUTE
app.post("/", (req, res) => {

	//VARIABLES num1, num2 hold data coming in from the html input form
	//n1, n2 present the name value of the item in the form

	var weight = String(req.body.n1);
	var height = String(req.body.n2);

	var result = weight + height;
 
	res.send("Your BMI is: " + result);
});


//Routes


app.listen(3000, () => {
	console.log("Server running...app listening on port${port}");
});