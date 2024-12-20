import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

export const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success: false, message: 'Missing Details'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user:{name: user.name}})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
    
};

export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({success: true, token, user:{name: user.name}})

        }else{
            return res.json({success: false, message: 'Invalid Credentials'})

        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
};

export const userCredits = async (req,res) => {
    try {
        const {userId}= req.body
        const user = await userModel.findById(userId)
        res.json({success:true, credits: user.creditBalance, user:{name:user.name}})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})

        
    }
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async(req,res)=>{
    try {
        const{userId,planId} = req.body
        const userData = await userModel.findById(userId)

        if(!userId || !planId){
            return  res.json({success:false, message:"Missing Details"})

        }
        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 10
                amount = 10
                
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 50
                amount = 50
                
                break;
            case 'Business':
                plan = 'Business'
                credits = 500
                amount = 250
                
                break;    
        
            default:
                return res.json({success:false, message:"Plan not found"});
        }
        date = Date.now();

        const transactionData = {
            plan, amount, date, userId, credits
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount:amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,


        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error){
                console.log(error);
                return res.json({success:false, message:error})
            }
            res.json({ success: true, order });
            
        })
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// export const verifyRazorpay = async (req,res) => {
//     try {
//         const {razorpay_order_id} = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid'){
//             const transactionData = await transactionModel.findById(orderInfo.receipt)

//             // This below checks if the payment field in the transaction data is already marked as true, 
//             // which would indicate that the payment was already processed.
//            // If it is true, the response indicates a failure because duplicate payments should not be allowed.

//             if(transactionData.payment){
//                 return res.json({success:false, message:"Payment Failed"})
//             }
//             const userData = await userModel.findById(transactionData.userId)
//             const creditBalance = userData.creditBalance + transactionData.credits

//             await userModel.findByIdAndUpdate(userData._id,{creditBalance})
//             await transactionModel.findByIdAndUpdate(transactionData._id,{payment: true})


//             res.json({success:true, message:"Credits Added"})

//         }
//         else{
//             res.json({success:true, message:"Payment Failed"})

//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }

export const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
      if (!razorpay_order_id) {
        return res.status(400).json({
          success: false,
          message: "Missing order ID"
        });
      }
  
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
      
      if (orderInfo.status === 'paid') {
        const transactionData = await transactionModel.findById(orderInfo.receipt);
        
        if (!transactionData) {
          return res.status(404).json({
            success: false,
            message: "Transaction not found"
          });
        }
  
        if (transactionData.payment) {
          return res.status(400).json({
            success: false,
            message: "Payment already processed"
          });
        }
  
        const userData = await userModel.findById(transactionData.userId);
        if (!userData) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          });
        }
  
        const creditBalance = userData.creditBalance + transactionData.credits;
  
        await Promise.all([
          userModel.findByIdAndUpdate(userData._id, { creditBalance }),
          transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })
        ]);
  
        return res.status(200).json({
          success: true,
          message: "Credits Added"
        });
      }
  
      return res.status(400).json({
        success: false,
        message: "Payment Failed"
      });
  
    } catch (error) {
      console.error('Payment verification error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || "Payment verification failed"
      });
    }
  }
  
  