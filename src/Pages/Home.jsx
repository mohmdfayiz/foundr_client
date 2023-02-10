import React from 'react';
import { useSelector } from 'react-redux';
import { Intro, EventSection, Profiles, Tiles, Working } from '../components';



export const Home = () => {
  const {authenticated} = useSelector((state)=>state.auth)
  return (
    <div>
        <Intro/>
        <Tiles/>
        {authenticated ? <Profiles/> : <Working/>}
        <EventSection/>
    </div>
  )
}