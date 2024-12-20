import React from 'react'
import Header from '../components/Header.jsx'
import Steps from '../components/Steps.jsx'
import Description from '../components/Description.jsx'
import Testimonials from '../components/Testimonials.jsx'
import GenerateButton from '../components/GenerateButton.jsx'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Steps></Steps>
      <Description></Description>
      <Testimonials></Testimonials>
      <GenerateButton></GenerateButton>
    </div>
  )
}

export default Home
