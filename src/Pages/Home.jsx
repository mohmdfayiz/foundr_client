import React from 'react';
import { Intro, EventSection, Profiles, Tiles, Working } from '../components';
import { useSelector } from 'react-redux';

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