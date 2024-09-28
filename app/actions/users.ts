'use server'

import {
  userFormDataDecoder,
  userCreateSchema,
  userUpdateSchema,
} from '@/components/app/users/schema'
import { db } from '@/db'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type UserFormState = {
  errors: {
    email?: string[]
    name?: string[]
    password?: string[]
    phone_number?: string[]
    admin?: string[]
    _form?: string[]
  }
}

export async function createUser(
  formState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const data = userFormDataDecoder(formData)
  const result = userCreateSchema.safeParse(data)

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const user = await db.user.create({
      data: {
        email: result.data.email,
        name: result.data.name,
        password: result.data.password,
        phone_number: result.data.phone_number,
        admin: result.data.admin,
      },
    })
    console.log(user.id)
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        return {
          errors: {
            email: ['Cet email est déjà utilisé'],
          },
        }
      }
      return {
        errors: {
          _form: [error.message],
        },
      }
    } else {
      console.log('Something went wrong')
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      }
    }
  }
  const cookieStore = cookies()
  cookieStore.set('toast', 'user.created')
  revalidatePath('/users')
  redirect('/users')
  return { errors: {} }
}

export async function updateUser(
  id: string,
  formState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const data = userFormDataDecoder(formData)
  const result = userUpdateSchema.safeParse(data)

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        name: result.data.name,
        phone_number: result.data.phone_number,
        admin: result.data.admin,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return {
        errors: {
          _form: [error.message],
        },
      }
    } else {
      console.log('Something went wrong')
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      }
    }
  }
  const cookieStore = cookies()
  cookieStore.set('toast', 'user.updated')
  revalidatePath('/users')
  redirect('/users')
  return { errors: {} }
}
