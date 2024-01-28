import HomeExerciseCard from '@/components/card/HomeExerciseCard'
import LocalSearch from '@/components/shared/search/LocalSearch'
// import { dummyExercises } from '@/constants/exercises'
import { getExercises } from '@/lib/actions/exercise.action'
import React from 'react'

const Exercise = async () => {
  const result = await getExercises({});

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Exercises</h1>
      <div className='mt-10'>
        <LocalSearch route="/exercise" placeholder="Search exercises" />
      </div>
      <div className='mt-6 flex w-full flex-wrap gap-6'>
        {result.exercises.map((item, i) => (
          <HomeExerciseCard key={i} id={item._id} bodyPart={item.bodyPart} name={item.name} gifUrl={item.gifUrl} target={item.target} />
        ))}
      </div>
    </>
  )
}

export default Exercise