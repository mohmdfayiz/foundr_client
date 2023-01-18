import React from 'react'
import { Link } from 'react-router-dom'
import founders from '../../assets/founders.svg'

const Button = ({props})=>{
    return(
        <Link to={props.link} className={props.class}>{props.text}</Link>
    )
}

export const Intro = () => {
  return (
    <div className='flex px-[3rem] py-[3rem] items-center'>
        <div>
            <h1 className='font-extrabold text-4xl lg:pr-10 text-darkBlue'>Connecting Better.</h1>
            <p className='font-medium  text-xl my-4 text-lightBlue'>Connect with co-founders based on your preferences
            for interests, skills, location, and more, and start building your company.</p>
            <Button props={{text:'Sing up', link:'signup', class:'bg-darkBlue px-6 py-2 mr-4 text-white rounded font-medium hover:shadow-md mt-2'}} />
            <Button props={{text:'Sing in', link:'signin', class:' px-5 py-2 text-darkBlue bg-white rounded border-darkBlue hover:shadow-md border border-darkBlue mt-2'}} />
        </div>
        <div className=''>
            <img src={founders} alt="founders_img" width={900}/>
        </div>
        
    </div>
  )
}
