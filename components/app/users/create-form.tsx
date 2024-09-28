'use client'

import { UserFormState } from './schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createUser } from '@/app/actions/users'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormState } from 'react-dom'

export function UserCreateForm() {
  const [formState, action] = useFormState<UserFormState, FormData>(
    createUser,
    {
      errors: {},
    }
  )

  return (
    <form action={action}>
      { formState.errors._form && <div className='text-red-500'>{formState.errors._form.join(',')}</div>}
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          className={formState.errors.email && 'border-2 border-red-500'}
        />
        {formState.errors.email && (
          <div className='text-red-500'>
            {formState.errors.email?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          className={formState.errors.name && 'border-2 border-red-500'}
        />
        {formState.errors.name && (
          <div className='text-red-500'>
            {formState.errors.name?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          id='password'
          name='password'
          className={formState.errors.password && 'border-2 border-red-500'}
        />
        {formState.errors.password && (
          <div className='text-red-500'>
            {formState.errors.password?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='confirmPassword'>Confirm password</Label>
        <Input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          className={
            formState.errors.confirmPassword && 'border-2 border-red-500'
          }
        />
        {formState.errors.confirmPassword && (
          <div className='text-red-500'>
            {formState.errors.confirmPassword?.join(', ')}
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
        />
        {formState.errors.phone_number && (
          <div className='text-red-500'>
            {formState.errors.phone_number?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-row items-center gap-x-4 my-4'>
        <Label htmlFor='admin'>Admin</Label>
        <Checkbox id='admin' name='admin' />
      </div>
      <Button type='submit'>Enregistrer</Button>
    </form>
  )
}
