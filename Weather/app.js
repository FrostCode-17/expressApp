const express = require("express");

const port = 4400;
const app = express();


app.get("/", (req, res) => {
console.log("<h1>WELCOME HOME</h1>");
res.send("Status code: 200 | GREEN LIGHT ");
});



app.listen(port, () => {
	console.log("Server running on ${port}");
});