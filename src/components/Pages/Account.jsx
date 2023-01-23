import React from 'react'
import ProfileCard from '../Account/ProfileCard'
import UserDetails from '../Account/UserDetails'
import Preferences from '../Account/Preferences'

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
