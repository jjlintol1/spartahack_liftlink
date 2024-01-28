import DiscoverLink from '@/components/card/DiscoverLink';
import HomeExerciseCard from '@/components/card/HomeExerciseCard';
import HomeRoutineCard from '@/components/card/HomeRoutineCard'
import { Button } from '@/components/ui/button'
import { discoverLinks } from '@/constants';
// import { dummyExercises } from '@/constants/exercises';
import { getExercises } from '@/lib/actions/exercise.action';
import React from 'react'

const homeRoutines = [
  {
    id: 1,
    user: {
      profile: "/assets/icons/account.svg",
      name: "John Doe"
    },
    name: "Brutal Leg Day",
    duration: "1h 30m",
    upvotes: 100,
    imgUrl: "/assets/images/workout.jpg"
  },
  {
    id: 2,
    user: {
      profile: "/assets/icons/account.svg",
      name: "John Doe"
    },
    name: "Brutal Leg Day",
    duration: "1h 30m",
    upvotes: 100,
    imgUrl: "/assets/images/workout.jpg"
  },
  {
    id: 3,
    user: {
      profile: "/assets/icons/account.svg",
      name: "John Doe"
    },
    name: "Brutal Leg Day",
    duration: "1h 30m",
    upvotes: 100,
    imgUrl: "/assets/images/workout.jpg"
  },
  {
    id: 4,
    user: {
      profile: "/assets/icons/account.svg",
      name: "John Doe"
    },
    name: "Brutal Leg Day",
    duration: "1h 30m",
    upvotes: 100,
    imgUrl: "/assets/images/workout.jpg"
  },
];

const Home = async () => {
  const exerciseResult = await getExercises({});

  return (
    <>
      <div className='w-full'>
        <h2 className='h2-semibold text-dark200_light800'>Featured Workouts</h2>
        <div className='mt-6 flex w-full gap-6 overflow-x-auto' style={{ overflowX: 'auto' }}>
          {homeRoutines.map((item, i) => (
            <HomeRoutineCard key={i} id={item.id} user={item.user} name={item.name} duration={item.duration} upvotes={item.upvotes} imgUrl={item.imgUrl}  />
          ))}
        </div>

        <div className='mt-6'>
          <Button className='btn-primary min-w-[150px] rounded-xl'>
            <p>View All</p>
          </Button>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='h2-semibold text-dark200_light800'>Discover</h2>
        <div className='mt-6 flex w-full gap-3 overflow-x-auto'>
          {discoverLinks.map((item, i) => (
            <DiscoverLink key={i} icon={item.icon} label={item.label} route={item.route} />
          ))}
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='h2-semibold text-dark200_light800'>Hot Workouts</h2>
        <div className='mt-6 flex w-full gap-6 overflow-x-auto' style={{ overflowX: 'auto' }}>
          {exerciseResult.exercises.map((item, i) => (
            <HomeExerciseCard key={i} id={item._id} bodyPart={item.bodyPart} name={item.name} gifUrl={item.gifUrl} target={item.target} />
          ))}
        </div>
        <div className='mt-6'>
          <Button className='btn-primary min-w-[150px] rounded-xl'>
            <p>Explore </p>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Home