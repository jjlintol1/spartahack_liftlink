import { auth } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  const { userId } = auth();

  return (
    <div>
      Home
      <h1>{userId}</h1>
    </div>
  )
}

export default Home