// Importing the Post type from the Prisma client library.
import type { User } from '@prisma/client'
import { db } from '@/db'
// Importing the notFound function from Next.js for handling 404 errors.
import { notFound } from 'next/navigation'

export async function fetchUsers(): Promise<User[]> {
  // Function to fetch all users from the database.
  return await db.user.findMany({
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
  })
}

export async function fetchUserById(id: string): Promise<User | null> {
  // Function to fetch a user by their ID.
  const user = await db.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    // If the user is not found, return a 404 error.
    throw notFound()
  }

  return user
}
