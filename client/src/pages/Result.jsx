import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    if (input) {
      const image = await generateImage(input)
      console.log("Generated Image:", image);  

      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center px-4 sm:px-6 lg:px-8'
    >
      <div className='w-full max-w-lg'>
        <div className='relative'>
          <img src={image} alt="" className='w-full rounded shadow-lg' />
          <span
            className={`absolute bottom-0 left-0 h-2 bg-blue-500
              ${loading ? 'w-full transition-all duration-[10s] ease-in-out transform scale-x-100 opacity-100 animate-pulse' : 'w-0 opacity-0 scale-x-0'}
            `}>
          </span>
        </div>
        <p className={`text-center mt-2 ${!loading ? 'hidden' : ''}`}>Loading....</p>
      </div>
      {!isImageLoaded &&
        <div className='flex flex-col sm:flex-row w-full max-w-xl bg-neutral-500 text-white text-sm p-2 mt-6 
        rounded-full'>
          <input 
            onChange={e => setInput(e.target.value)} 
            value={input}
            type="text" 
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none px-4 py-2 mb-2 sm:mb-0 placeholder-gray-300' 
          />
          <button 
            type='submit' 
            className='bg-zinc-900 px-6 py-2 rounded-full w-full sm:w-auto'
          >
            Generate
          </button>
        </div>
      }
      {isImageLoaded && 
        <div className='flex flex-col sm:flex-row gap-4 justify-center text-sm mt-6'>
          <button
            onClick={() => { setIsImageLoaded(false) }}
            className='bg-transparent border border-zinc-900 text-black px-6 py-2 rounded-full cursor-pointer w-full sm:w-auto'
          >
            Generate Another
          </button>
          <a 
            href={image} 
            download 
            className='bg-zinc-900 text-white px-6 py-2 rounded-full cursor-pointer text-center w-full sm:w-auto'
          >
            Download
          </a>
        </div>
      }
    </motion.form>
  )
}

export default Result

