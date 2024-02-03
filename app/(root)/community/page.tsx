import UserCard from '@/components/card/UserCard';
import LocalSearch from '@/components/shared/search/LocalSearch'
import { getAllUsers } from '@/lib/actions/user.action'
import React from 'react'

const Community = async () => {
  const result = await getAllUsers();

  const { users } = result;

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Community</h1>
      <div className='mt-10'>
        <LocalSearch route='community' placeholder='Search for users' />
      </div>
      <div className='mt-6 flex w-full flex-wrap gap-4'>
        {users.length > 0 ? users.map((user) => (
          <UserCard key={user._id} clerkId={user.clerkId} name={user.name} username={user.username} picture={user.picture} followers={20} following={20} />
        )) : (
          <div>No Users</div>
        )}
      </div>
    </>
  )
}

export default Community