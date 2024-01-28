import LocalSearch from '@/components/shared/search/LocalSearch'
import React from 'react'

import { dummyRoutines } from '@/constants/routines'

const Routine = () => {
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Workout Routines</h1>
      <div className='mt-10'>
        <LocalSearch route='/routines' placeholder='Search routines' />
      </div>
      <div className='mt-6 flex w-full flex-col gap-6'>
        {dummyRoutines.map((item, i) => (
          <h1 key={i}>Routine</h1>
        ))}
      </div>
    </>
  )
}

export default Routine