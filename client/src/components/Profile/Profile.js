import React from 'react'

import UserInfo from './UserInfo';
import UserRecipes from '../../queries/UserRecipes';

import WithAuth from "../WithAuth";

const Profile = ({ session }) => {
  return (
    <div>
      <UserInfo  session = {session}/>

      <UserRecipes username ={ session.getCurrentUser.username }/>
    </div>
  )
}

export default WithAuth(session => session && session.getCurrentUser)(Profile);