import { initDatabase, saveDatabaseToStore } from "../../db/Database";
import { type Batch } from "../../models/Batch";


export async function getBatches(): Promise<Batch[]> {
  const db = await initDatabase();

  const result = await db.query(`
    SELECT
      batches.*,
      recipes.name AS recipe_name,
      vessels.name AS vessel_name
    FROM batches
    LEFT JOIN recipes ON recipes.id = batches.recipe_id
    LEFT JOIN vessels ON vessels.id = batches.vessel_id
    WHERE batches.deleted_at IS NULL
    ORDER BY batches.created_at DESC;
  `);

  return (result.values ?? []).map((row: any) => ({
    id: row.id,
    name: row.name,
    recipeId: row.recipe_id,
    recipeName: row.recipe_name,
    vesselId: row.vessel_id,
    vesselName: row.vessel_name,
    status: row.status,
    startedAt: row.started_at,
    estimatedDays: row.estimated_days,
    currentDay: row.current_day,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncStatus: row.sync_status,
  }));
}

export async function createBatch(input: {
  name: string;
  recipeId?: string;
  vesselId?: string;
  status?: string;
  estimatedDays: number;
}): Promise<Batch> {
  const db = await initDatabase();
  const now = new Date().toISOString();

  const batch: Batch = {
    id: crypto.randomUUID(),
    name: input.name,
    recipeId: input.recipeId ?? null,
    vesselId: input.vesselId ?? null,
    status: input.status ?? "primary",
    startedAt: now,
    estimatedDays: input.estimatedDays,
    currentDay: 0,
    createdAt: now,
    updatedAt: now,
    syncStatus: "pending",
  };

  await db.run(
    `
      INSERT INTO batches (
        id, name, recipe_id, vessel_id, status, started_at,
        estimated_days, current_day, created_at, updated_at,
        deleted_at, sync_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      batch.id,
      batch.name,
      batch.recipeId,
      batch.vesselId,
      batch.status,
      batch.startedAt,
      batch.estimatedDays,
      batch.currentDay,
      batch.createdAt,
      batch.updatedAt,
      null,
      batch.syncStatus,
    ]
  );

  await saveDatabaseToStore();
  return batch;
}