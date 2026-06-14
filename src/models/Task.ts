export type Task = {
  id: string;
  title: string;
  batchId?: string | null;
  dueDate: string;
  completedAt?: string | null;
  syncStatus: "local" | "pending" | "synced" | "conflict";
};