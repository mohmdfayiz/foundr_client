import React from 'react'
import {tileData} from '../../constants/index'


const Tile = ({props}) => {
  return (
    <div className='rounded bg-white justify-between px-3 py-5 m-4 shadow'>
        <img src={props} alt="icon" />
        <h3 className='text-darkBlue font-bold my-2'>{props.title}</h3>
        <p className='text-lightBlue'>{props.text}</p>
    </div>
  )
}

export const Tiles= ()=>{
    return(
        <div  className='grid md:grid-cols-3 sm:grid-cols-1 mx-[3rem]'>
            <Tile props={{icon:tileData[0].icon, title:tileData[0].title, text:tileData[0].text}}/>
            <Tile props={{icon:tileData[1].icon, title:tileData[1].title, text:tileData[1].text}}/>
            <Tile props={{icon:tileData[2].icon, title:tileData[2].title, text:tileData[2].text}}/>
        </div>
    )
}