import React from 'react'
import { Intro } from '../Intro/Intro';
import { EventSection } from '../Mentorship/EventSection';
import {Profiles} from '../Profiles/Profiles';
import { Tiles } from '../Tiles/Tiles';
import { Working } from '../Working/Working';
let login = false

export const Home = () => {
  return (
    <div>
        <Intro/>
        <Tiles/>
        {login ? <Profiles/> :<Working/>}
        <EventSection/>
    </div>
  )
}