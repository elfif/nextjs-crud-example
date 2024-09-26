import { db } from '@/db'
import { User } from '@prisma/client'

export async function initUsers(): Promise<void> {
  try {
    // If validation passes, create a new post in the database
    let user = await db.user.create({
      data: {
        email: 'fifoooo@gmail.com',
        name: 'Fifoooo',
        password: '123456',
        phone_number: '+33662473369',
        admin: true,
      },
    })
    if (user) {
      console.log('User created')
    }
  } catch (error: unknown) {
    // If there's an error, return it
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log('Something went wrong')
    }
  }
}

export default async function main() {
  await initUsers()
}

main()
