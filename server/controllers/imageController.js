import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";


export const generateImage = async (req,res) => {
    try {
        const {userId,prompt} = req.body;
        const user = await userModel.findById(userId)
        if(!user || !prompt){
            return res.json({success: false, message: "Missing Details"})
        }
        if(user.creditBalance === 0 || user.creditBalance < 0){
            return res.json({success: false, message: 'No Credit Balance',
                creditBalance:user.creditBalance
            })

        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                  },
                  responseType:'arraybuffer'
                //   responseType: 'arraybuffer': This tells Axios to expect the response to be 
                // in the form of an array buffer (i.e., raw binary data, which is what an image file is). 
                // Buffer.from(data, 'binary'): This creates a Buffer object from the binary data (which is the image returned by the API).
                // data is the binary image data returned by the ClipDrop API.
                // 'binary' indicates the format in which the data is passed in.
                // .toString('base64'): This converts the binary data into a Base64 encoded string.
                // Base64 encoding is a way to represent binary data (like images) as text, which can easily be sent over networks, embedded in web pages, etc.
        
             }
        )

        const base64Image= Buffer.from(data,'binary').toString('base64')


        const resultImage   = `data:image/png;base64,${base64Image}`
        console.log(resultImage);  // Add this to verify if the base64 image is being generated correctly.


        await userModel.findByIdAndUpdate(user._id, {creditBalance:
            user.creditBalance - 1
        })

        res.json({success:true, message:'Image Generated', creditBalance:user.creditBalance-1, resultImage})


    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}