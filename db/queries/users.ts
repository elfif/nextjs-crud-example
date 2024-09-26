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
