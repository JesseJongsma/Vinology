import { type IRepository } from "../IRepository";
import { type Batch } from "../../../models/Batch";
import { initDatabase } from "../../../db/Database";

export class SQLiteBatchRepository
	implements IRepository<Batch> {
	async getAll(): Promise<Batch[]> {
		const db = await initDatabase();

		const result = await db.query(`
	  SELECT *
	  FROM batches
	  WHERE deleted_at IS NULL
	  ORDER BY created_at DESC
	`);

		return (result.values ?? []).map(
			this.mapBatch
		);
	}

	async find(id: string): Promise<Batch | null> {
		const db = await initDatabase();

		const result = await db.query(
			`
	  SELECT *
	  FROM batches
	  WHERE id = ?
	  LIMIT 1
	`,
			[id]
		);

		if (!result.values?.length) {
			return null;
		}

		return this.mapBatch(result.values[0]);
	}

	create(): Promise<Batch> {
		const batch: Batch = {
			id: crypto.randomUUID(),
			name: "",
			recipeId: null,
			vesselId: null,
			status: "planned",
			startedAt: new Date().toISOString(),
			estimatedDays: 0,
			currentDay: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			syncStatus: "local",
		};

		return Promise.resolve(batch);
	}

	async save(batch: Batch): Promise<Batch> {
		const db = await initDatabase();

		await db.run(
			`
	  INSERT INTO batches (
		id,
		name,
		recipe_id,
		vessel_id,
		status,
		started_at,
		estimated_days,
		current_day,
		created_at,
		updated_at,
		sync_status
	  )
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

	  ON CONFLICT(id)
	  DO UPDATE SET
		name = excluded.name,
		recipe_id = excluded.recipe_id,
		vessel_id = excluded.vessel_id,
		status = excluded.status,
		started_at = excluded.started_at,
		estimated_days = excluded.estimated_days,
		current_day = excluded.current_day,
		created_at = excluded.created_at,
		updated_at = excluded.updated_at,
		sync_status = excluded.sync_status
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
				batch.syncStatus,
			]
		);

		return batch;
	}

	async delete(id: string): Promise<void> {
		const db = await initDatabase();

		await db.run(
			`
	  UPDATE batches
	  SET deleted_at = ?
	  WHERE id = ?
	  `,
			[new Date().toISOString(), id]
		);
	}

	private mapBatch(row: any): Batch {
		return {
			id: row.id,
			name: row.name,
			recipeId: row.recipe_id,
			vesselId: row.vessel_id,
			status: row.status,
			startedAt: row.started_at,
			estimatedDays: row.estimated_days ?? 0,
			currentDay: row.current_day ?? 0,
			createdAt: row.created_at,
			updatedAt: row.updated_at,
			deletedAt: row.deleted_at,
			syncStatus: row.sync_status,
		};
	}
}