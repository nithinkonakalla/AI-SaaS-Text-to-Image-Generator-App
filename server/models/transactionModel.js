import mongoose from "mongoose";
import Razorpay from "razorpay"; // Correct import

const transactionSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    plan: {type:String, required:true},
    amount: {type:Number, required:true},
    credits:{type:Number, required:true},
    payment:{type:Boolean, default:false},
    date:{type:Number},
})

const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema)
// will check if there is any model existed already to avoid creating transactionmodel repeatedly

export default transactionModel;
