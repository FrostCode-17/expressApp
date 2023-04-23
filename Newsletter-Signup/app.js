// import required packages
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// On the home route, send signup html template
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

// Manage post request on home route and
// Send data to the MailChimp account via API
app.post("/", (req, res) => {
	//Capturing form data from user input using value names
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;
	
	//Javascript data object
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
		}
	]
	};

    // Converting string data to JSON data
	const jsonData = JSON.stringify(data);

	const url = "'https://us21.api.mailchimp.com/3.0/lists/5337ae6065";

	const options = {
		method: "POST",
		auth: "tatenda17:f1e0cb4133f9442f2c5d6ddd861f76d9-us21"
	}

	//https request
   const request = https.request(url, options, (response) => {
		response.on("data", (data) => {
			console.log(JSON.parse(data));
		});
	});

	//Pass data to mailchimp server
	request.write(jsonData);
	//End of request
	req.end();

});


const port = 4400;

app.listen(port, () => {
	console.log("Server is running on port: ${port}")
})

//mailchamp servers apiKey
//f1e0cb4133f9442f2c5d6ddd861f76d9-us21

//Audince list id: 5337ae6065
