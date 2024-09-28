'use client'

import { UserFormState } from './schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormState } from 'react-dom'
import { User } from '@prisma/client'

// Because we use bind in the edit/page.tsx file to automatically pass the id of the user to the updateUser function
// we need to redefine the tytpe of the updateAction function
// Otherwise typescript won't allow it....
export type UpdateAction = ( formState: UserFormState, formData: FormData) => Promise<UserFormState>

export function UserUpdateForm(props: { updateAction: UpdateAction, user: User }) {
  const [formState, action] = useFormState<UserFormState, FormData>(
    props.updateAction,
    {
      errors: {},
    }
  )

  return (
    <form action={action}>
      { formState.errors._form && <div className='text-red-500'>{formState.errors._form.join(',')}</div>}
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          className={formState.errors.name && 'border-2 border-red-500'}
          defaultValue={props.user.name}
        />
        {formState.errors.name && (
          <div className='text-red-500'>
            {formState.errors.name?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='phone_number'>Phone number</Label>
        <Input
          type='tel'
          id='phone_number'
          name='phone_number'
          className={formState.errors.phone_number && 'border-2 border-red-500'}
          defaultValue={props.user.phone_number}
        />
        {formState.errors.phone_number && (
          <div className='text-red-500'>
            {formState.errors.phone_number?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-row items-center gap-x-4 my-4'>
        <Label htmlFor='admin'>Admin</Label>
        <Checkbox id='admin' name='admin' defaultChecked={props.user.admin} />
      </div>
      <Button type='submit'>Enregistrer</Button>
    </form>
  )
}
