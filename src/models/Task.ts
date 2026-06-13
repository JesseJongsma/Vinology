export type Task = {
  id: string;
  title: string;
  batchId?: string | null;
  batchName?: string | null;
  dueDate: string;
  completedAt?: string | null;
};