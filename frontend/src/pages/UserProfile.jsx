import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const user = useSelector(state=>state.user)
  console.log('usr',user)
  return (
    <div>
      profile page
    </div>
  )
}

export default UserProfile
