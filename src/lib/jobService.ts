import { PrismaClient } from '@prisma/client';
import type { JobPost as PrismaJobPost } from '@prisma/client';

// Use a global variable to prevent multiple instances in dev mode
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Redact password for logging
const debugUrl = process.env.POSTGRES_PRISMA_URL?.replace(/:[^:@]+@/, ':****@');
console.log(`[Prisma] Initializing client with URL: ${debugUrl}`);

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export type JobPost = PrismaJobPost;

export const jobService = {
  async getAll() {
    return await prisma.jobPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  async getBySlug(slug: string) {
    return await prisma.jobPost.findUnique({
      where: { slug }
    });
  },

  async create(jobData: any) {
    return await prisma.jobPost.create({
      data: jobData
    });
  },

  async update(slug: string, data: any) {
    return await prisma.jobPost.update({
      where: { slug },
      data
    });
  },

  async delete(slug: string) {
    try {
      await prisma.jobPost.delete({
        where: { slug }
      });
    } catch (error) {
      console.warn(`[JobService] Failed to delete job ${slug}:`, error);
    }
  }
};
