import React from 'react'
import { ProfileCard, UserDetails, Preferences } from '../components'

export const Account = () => {
  return (
    <div className="m-[3rem]">
      <div className="p-[1.5rem] grid grid-cols-12 ">
        <ProfileCard/>
        <UserDetails/>
        <Preferences/>
      </div>
    </div>
  )
}
