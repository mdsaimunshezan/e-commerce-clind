import React from 'react'
import { FaFacebookF,FaYoutube,FaInstagram,FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.svg"

const Footer = () => {
  return (
  <div className="bg-[#2e2e54] mt-[80px] py-[30px]">
      <div className="container mx-auto px-6 grid gap-y-6 grid-cols-1 md:grid-cols-3">
        <div className='text-white font-semibold'>
            <h3 className='text-xl  mb-4'>Customer Care</h3>
            <h5>Help Center</h5>
            <h5>How to Buy</h5>
            <h5>Returns & Refunds</h5>
            <h5>Contact Us</h5>
            <h5>Terms & Conditions</h5>
        </div>
        <div className="">
            <h3 className='text-xl text-white font-semibold mb-6'>Follow Us</h3>
            <div className="flex gap-4">
            <div className="border border-blue-800  cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full text-xl text-blue-800"><FaFacebookF/></div>
            <div className="border border-red-500  cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full text-xl text-red-500"><FaYoutube/></div>
            <div className="border border-pink-800  cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full text-xl text-pink-800"><FaInstagram/></div>
            <div className="border border-blue-500  cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full text-xl text-blue-500"><FaTwitter/></div>
            </div>
        </div>
        <div className="flex flex-wrap gap-x-4">
            <img className='h-[150px] rounded' src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1nvAvXMFY.1VjSZFnXXcFHXXa.png" alt="" />
            <div className="bg-white w-[130px] inline-block h-[50px] mt-[30px]">
            <img src={logo} className="w-[130px] inline-block h-[50px]" alt="" />
            <h3 className='text-red-500 text-md font-medium'>Happy Shopping</h3>
            <h4 className='text-white font-medium'>Download App</h4>
            </div>
            
        </div>
    </div>
  </div>
  )
}

export default Footer