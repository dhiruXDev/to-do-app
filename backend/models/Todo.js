// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	user_id: {
		type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Todo", todoSchema);
