import RoutineForm from '@/components/form/RoutineForm';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const CreateRoutine = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Create Exercise Routine</h1>
      <RoutineForm mongoUserId={JSON.stringify(mongoUser._id)} />
    </>
  )
}

export default CreateRoutine