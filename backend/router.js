// routes/todo.js
const express = require("express");
const router = express.Router();
const Todo = require("./models/Todo");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CONFIG = require("./config/config");
const jwtSecret = CONFIG.jwtSecret;
// Get all todos
router.get("/api/todo",  async (req, res) => {
	let token = req.headers.authorization;
	const decoded = jwt.verify(token, jwtSecret);
  	const userId = decoded.userId;
	try {
		const todos = await Todo.find({ user_id: userId }).sort({ created_date: -1 });
		res.json(todos);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get a single todo
router.get("/api/todo/:id", getTodo, (req, res) => {
	res.json(res.todo);
});

// Create a todo
router.post("/api/todo", async (req, res) => {
	let token = req.headers.authorization;
	const decoded = jwt.verify(token, jwtSecret);
  	const userId = decoded.userId;

	const todo = new Todo({
		title: req.body.title,
		user_id: userId,
	});

	try {
		const newTodo = await todo.save();
		res.status(201).json(newTodo);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update a todo
router.patch("/api/todo/:id", getTodo, async (req, res) => {
	if (req.body.title) res.todo.title = req.body.title;
	if (req.body.completed) res.todo.completed = req.body.completed;

	try {
		const updatedTodo = await res.todo.save();
		res.json(updatedTodo);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete a todo
router.delete("/api/todo/:id", getTodo, async (req, res) => {
	try {
		await res.todo.remove();
		res.json({ message: "Todo deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Middleware to get a single todo by ID
async function getTodo(req, res, next) {
	try {
		let token = req.headers.authorization;
		const decoded = jwt.verify(token, jwtSecret);
		const userId = decoded.userId;
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ message: "Todo not found" });
		}
		if(todo.user_id.toString() !== userId) {
			return res.status(404).json({ message: "Forbidden error" });
		}
		res.todo = todo;
		next();
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

//Middleware to check user already exist on register
async function getUser(req, res, next) {
	const { username, email, password } = req.body;

	try {
		// Check if the user already exists
		User.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			console.error(err);
			return res.status(500).send({ message: 'An error occurred while registering the user', status: 500 });
		}
		if (user) {
			return res.status(412).send({ message: 'User already exists' , status: 412});
		}
		next();
	});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}


// Define routes
router.post("/api/register",getUser, (req, res) => {
	// Create new User instance
	const user = new User({
		email: req.body.email,
		name:req.body.name,
		password: bcrypt.hashSync(req.body.password),
	});

	// Save User instance to database
	user.save((err, _user) => {
		if (err) {
			console.log(err);
			res.status(500).send({
				msg: "Error registering new user.",
			});
		} else {
			// Generate JWT token
			const token = jwt.sign({ userId: _user._id }, jwtSecret);
			res.status(200).send({
				msg: "Welcome to the club!",
				id: _user._id,
				token: token,
				status: 200
			});
		}
	});
});

router.post("/api/login", (req, res) => {
	// Find User instance with matching email
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({
				msg: "Error on the server.",
			});
		} else if (!user) {
			res.status(401).send({
				msg: "Invalid email or password.",
			});
		} else if (!bcrypt.compareSync(req.body.password, user.password)) {
			res.status(401).send({
				msg: "Invalid email or password.",
			});
		} else {
			// Generate JWT token
			const token = jwt.sign({ userId: user._id }, jwtSecret);

			// Send JWT token in response
			res.status(200).send({ auth: true, token: token });
		}
	});
});

module.exports = router;
