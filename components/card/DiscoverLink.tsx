import { IDiscoverLink } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DiscoverLink = ({ icon, label, route }: IDiscoverLink) => {
  return (
    <Link href={route} className='card-wrapper min-w-[180px] rounded-xl'>
        <div className='flex min-w-[110px] flex-col items-center justify-center gap-3 p-3'>
            <Image src={icon} alt={label} width={30} height={30} className='invert-0 dark:invert' />
            <p className='body-regular text-dark300_light700'>{label}</p>
        </div>
    </Link>
  )
}

export default DiscoverLink