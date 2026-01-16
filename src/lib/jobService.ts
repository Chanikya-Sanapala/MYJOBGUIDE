import { PrismaClient } from '@prisma/client';
import type { JobPost as PrismaJobPost } from '@prisma/client';

// Use a global variable to prevent multiple instances in dev mode
const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log('Initializing Prisma Client...');
console.log('Database URL:', process.env.POSTGRES_PRISMA_URL ? 'Defined' : 'Undefined');

export const prisma = globalForPrisma.prisma || new PrismaClient();

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

  async create(jobData: Omit<JobPost, 'id' | 'createdAt'>) {
    return await prisma.jobPost.create({
      data: {
        ...jobData,
        // deadline is passed as string from form, ensure it matches schema
      }
    });
  },

  async update(slug: string, data: Partial<JobPost>) {
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
