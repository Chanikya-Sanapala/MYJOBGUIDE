import fs from 'fs/promises';
import path from 'path';

export interface JobPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  applyLink: string;
  deadline: string;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'jobs.json');

async function ensureDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, '[]');
  }
}

async function readDB(): Promise<JobPost[]> {
  await ensureDB();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

async function writeDB(data: JobPost[]) {
  await ensureDB();
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export const jobService = {
  async getAll() {
    return readDB();
  },

  async getBySlug(slug: string) {
    const jobs = await readDB();
    return jobs.find(job => job.slug === slug);
  },

  async create(job: Omit<JobPost, 'id' | 'createdAt'>) {
    const jobs = await readDB();
    const newJob: JobPost = {
      ...job,
      id: Math.random().toString(36).substring(2, 15), // Simple ID
      createdAt: new Date().toISOString(),
    };
    jobs.push(newJob);
    await writeDB(jobs);
    return newJob;
  },

  async update(slug: string, data: Partial<JobPost>) {
    const jobs = await readDB();
    const index = jobs.findIndex(j => j.slug === slug);
    if (index === -1) return null;

    jobs[index] = { ...jobs[index], ...data };
    await writeDB(jobs);
    return jobs[index];
  },

  async delete(slug: string) {
    console.log(`[JobService] Deleting job with slug: ${slug}`);
    let jobs = await readDB();
    const initialLength = jobs.length;
    jobs = jobs.filter(job => job.slug !== slug);
    const finalLength = jobs.length;
    console.log(`[JobService] Jobs before: ${initialLength}, After: ${finalLength}`);

    if (initialLength === finalLength) {
      console.warn(`[JobService] No job found with slug: ${slug}`);
    } else {
      await writeDB(jobs);
      console.log(`[JobService] Successfully wrote ${finalLength} jobs to DB`);
    }
  }
};
