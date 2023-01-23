import React from 'react'
import { useState } from 'react';
import { Intro } from '../Intro/Intro';
import { EventSection } from '../Mentorship/EventSection';
import {Profiles} from '../Profiles/Profiles';
import { Tiles } from '../Tiles/Tiles';
import { Working } from '../Working/Working';

export const Home = () => {
  const [login,setLogin] = useState(true)
  return (
    <div>
        <Intro login={login}/>
        <Tiles/>
        {login ? <Profiles/> : <Working/>}
        <EventSection/>
    </div>
  )
}