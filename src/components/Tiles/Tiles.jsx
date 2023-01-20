import React from 'react'
import {tileData} from '../../constants/index'


const Tile = ({data}) => {
  return (
    <div className='rounded bg-white justify-between px-3 py-5 m-4 shadow'>
        <img src={data.icon} alt="icon" width={35} />
        <h3 className='text-darkBlue font-bold my-2'>{data.title}</h3>
        <p className='text-lightBlue'>{data.text}</p>
    </div>
  )
}

export const Tiles= ()=>{
    return(
        <div  className='grid md:grid-cols-3 sm:grid-cols-1 mx-[3rem]'>
            <Tile data={{icon:tileData[0].icon, title:tileData[0].title, text:tileData[0].text}}/>
            <Tile data={{icon:tileData[1].icon, title:tileData[1].title, text:tileData[1].text}}/>
            <Tile data={{icon:tileData[2].icon, title:tileData[2].title, text:tileData[2].text}}/>
        </div>
    )
}