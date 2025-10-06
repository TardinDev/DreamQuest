import { create } from 'zustand'
import { JobResponse } from './api'

interface DreamQuestStore {
  currentJobId: string | null
  currentJob: JobResponse | null
  jobs: JobResponse[]

  setCurrentJob: (job: JobResponse) => void
  setCurrentJobId: (jobId: string | null) => void
  addJob: (job: JobResponse) => void
  updateJob: (jobId: string, job: JobResponse) => void
  clearCurrentJob: () => void
}

export const useDreamQuestStore = create<DreamQuestStore>((set) => ({
  currentJobId: null,
  currentJob: null,
  jobs: [],

  setCurrentJob: (job) => set({ currentJob: job, currentJobId: job.jobId }),

  setCurrentJobId: (jobId) => set({ currentJobId: jobId }),

  addJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs],
      currentJob: job,
      currentJobId: job.jobId,
    })),

  updateJob: (jobId, job) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.jobId === jobId ? job : j)),
      currentJob: state.currentJobId === jobId ? job : state.currentJob,
    })),

  clearCurrentJob: () => set({ currentJob: null, currentJobId: null }),
}))
