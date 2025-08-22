import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {

  const galaxyImageUrl = 'https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=1208&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-[190px] font-extrabold bg-clip-text text-transparent ' style={{ backgroundImage: `url(${galaxyImageUrl})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>
        Oops!
      </h1>
      <p className='text-3xl font-bold'>404 - PAGE NOT FOUND</p>
      <p className='w-[30%] text-center '>The page you are looking for might have been removed had its name Changed or is temporary unavailable</p>
      <Link to={'/'} className='text-xl font-bold text-white bg-primary p-5 px-10 rounded-2xl my-10'>Back To Home</Link>
    </div >
  )
}

export default NotFound