// src/db/index.ts
import { PrismaClient } from '@prisma/client'
// Creating a new instance of PrismaClient.
export const db = new PrismaClient()
