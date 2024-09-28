import { fetchUserById } from '@/db/queries/users'
import PageWithTitle from '@/components/ui/page-with-title'
import React from 'react';
import { notFound } from 'next/navigation';

interface UserShowProps {
    params: {
        id: string;
    };
}

export default async function User(props: UserShowProps) {
  const user = await fetchUserById(props.params.id)

  if (!user) {
    return notFound()
  }
  
  return (
    <PageWithTitle title={user.name}>
      <div className='m-4 flex flex-col gap-y-2'>
        <div>
          <p className='text-lg font-semibold'>Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className='text-lg font-semibold'>Phone</p>
          <p>{user.phone_number}</p>
        </div>
        <div>
          <p className='text-lg font-semibold'>Address</p>
          <p>{user.address}</p>
        </div>
        <div>
          <p className='text-lg font-semibold'>Admin</p>
          <p>{user.admin ? 'Oui' : 'Non'}</p>
        </div>
      </div>
    </PageWithTitle>
  )
}