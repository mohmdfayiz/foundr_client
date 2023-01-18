import React from 'react'
import { Intro } from '../Intro/Intro';
import { Tiles } from '../Tiles/Tiles';
import { Working } from '../Working/Working';


export const Home = () => {
  return (
    <div>
        <Intro/>
        <Tiles/>
        <Working/>
    </div>
  )
}
