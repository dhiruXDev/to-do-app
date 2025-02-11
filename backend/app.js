const express = require("express");
const app = express();
const bodyPraser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const verifyToken = require("./helper/verifyToken");

app.use(cors());
mongoose
	.connect(
		"mongodb+srv://jyotilnwebworks:WK3y9NWN5KGIMdZB@cluster0.4fgkafe.mongodb.net/?retryWrites=true&w=majority"
		// "mongodb+srv://gurinder:gurinder12345@cluster0.lhqylll.mongodb.net/?retryWrites=true&w=majority"
	)
	.then((res) => {
		console.log("Database connected");
	})
	.catch((e) => {
		console.log("error");
		console.log(e);
	});

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use(verifyToken);
app.use(require("./router"));

app.listen(3000);
