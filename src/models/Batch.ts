export type Batch = {
  id: string;
  name: string;
  recipeId?: string | null;
  vesselId?: string | null;
  status: string;
  startedAt: string;
  estimatedDays: number;
  currentDay: number;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  syncStatus: "local" | "pending" | "synced" | "conflict";
};