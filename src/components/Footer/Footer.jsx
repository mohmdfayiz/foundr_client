import React from 'react'
import foundrLogo from '../../assets/logo.svg'

export const Footer = () => {
  return (
    <div className='bg-white px-[3rem] py-[2rem] flex justify-between items-center w-full'>
        <div>
            <img src={foundrLogo} alt="logo" width={100}/>
        </div>
        <div className='flex gap-8'>
            <li className="text-[#326789] hover:text-lightBlue">About</li>
            <li className="text-[#326789] hover:text-lightBlue">Privacy</li>
            <li className="text-[#326789] hover:text-lightBlue">FAQs</li>
            <li className="text-[#326789] hover:text-lightBlue">Help</li>
        </div>

    </div>
  )
}
