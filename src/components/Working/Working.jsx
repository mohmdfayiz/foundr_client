import React from 'react'
import { steps } from '../../constants'

const Steps = ({props})=>{
    return(
        <div className='flex items-center justify-center'>
            <div className='bg-lightBlue h-12 w-12 m-3 flex items-center justify-center rounded-full'>
                <p className='text-white'>{props.index}</p>
            </div>
            <div className='w-2/3'>
                <p  className="text-lightBlue text-xl ml-4">{props.text}</p>
            </div>
        </div>
    )
}

export const Working = () => {
  return (
    <div className='my-[3rem] flex flex-col'>
        <h2 className='font-extrabold text-2xl text-darkBlue pb-4 text-center'>How does it work?</h2>
        <Steps props={{index:steps[0].id,text:steps[0].text}}/>
        <Steps props={{index:steps[1].id,text:steps[1].text}}/>
        <Steps props={{index:steps[2].id,text:steps[2].text}}/>
        <Steps props={{index:steps[3].id,text:steps[3].text}}/>
    </div>
  )
}
