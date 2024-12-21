import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {

  const [state, setState] = useState('Login');
  const {setShowLogin,backendUrl,setToken,setUser} = useContext(AppContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
        handleResponse(data, 'Logged in successfully');
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        handleResponse(data, 'Registered successfully');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (data, successMessage) => {
    if (data.success) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setShowLogin(false);
      toast.success(successMessage);
    } else {
      toast.error(data.message);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An error occurred. Please try again.');
    }
  };


  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return()=>{
      document.body.style.overflow = "unset";

    }
  },[]);

  return (
    <motion.div
      initial={{opacity:0.2, y:50}}
      transition={{duration:0.3}}
      whileInView={{opacity:1,y:0 }}
      viewport={{once: true}}
      className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
    >
      <form
        onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500'
      >
        <h1 className='text-center text-2xl text-neutral-700'>{state}</h1>
        <p className='text-sm mt-2'>Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className='border px-5 py-2 flex items-center rounded-full mt-4'>
            <img width={26} src={assets.profile_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className='outline-none text-sm'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='outline-none text-sm'
            placeholder='Email ID'
            required
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className='outline-none text-sm'
            placeholder='Password'
            required
          />
        </div>
        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`bg-blue-600 w-full text-white py-2 rounded-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : (state === 'Login' ? 'Login' : 'Create Account')}
        </button>

        {isLoading && (
          <div className="loading-message mt-4 text-center text-sm text-slate-500 italic">
            <p>Loading... Please be patient!</p>
            <p>I'm using a free hosting service, so it might take a moment.</p>
            <p>Your awesome experience is worth the wait! 😊</p>
          </div>
        )}

        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don't have an account?
            <span 
              className='text-blue-600 cursor-pointer'
              onClick={() => setState('Sign Up')}
            >
              Sign Up
            </span>
          </p>    
        ) : (
          <p className='mt-5 text-center'>
            Already have an account? 
            <span 
              className='text-blue-600 cursor-pointer'
              onClick={() => setState('Login')}
            >
              Sign In
            </span>
          </p>
        )}     

        <img 
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className='absolute top-5 right-5 cursor-pointer' 
          alt=""
        />
      </form>
    </motion.div>
  );
};

export default Login
