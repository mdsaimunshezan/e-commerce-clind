import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Navber from './Navber'

const NotFoundPage = () => {
  return (
   <div>
    <Navber/>
     <div className='flex justify-center flex-col items-center h-screen'>
       <h1 className=' capitalize text-3xl font-semibold'> page not found</h1>
        <Link to="/" className='text-blue-500 block text-lg mt-2 capitalize'>
        back to home page
        </Link>
    </div>
    <Footer/>
   </div>
  )
}

export default NotFoundPage