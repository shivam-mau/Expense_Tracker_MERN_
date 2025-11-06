const mongoose = require("mongoose");
const { applyTimestamps } = require("./User");

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    source: { type: String, required: true },//example: salary , frelance,etc
    amount: { type: Number, required: true },
    date: { type:Date, default: Date.now },
}, { applyTimestamps: true });

module.exports = mongoose.model("Income", IncomeSchema);
