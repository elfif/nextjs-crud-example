import { fetchUserById } from '@/db/queries/users'
import PageWithTitle from '@/components/ui/page-with-title'
import React from 'react';
import { notFound } from 'next/navigation';
import { updateUser } from '@/app/actions/users';
import { UserUpdateForm } from '@/components/app/users/update-form';

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

  const updateAction = updateUser.bind(null, user.id)

  return <PageWithTitle title={`Modifier ${user.email}`}>
    <UserUpdateForm updateAction={updateAction} user={user} />
  </PageWithTitle>
}