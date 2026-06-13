import { type IRepository } from "../IRepository";
import { type Vessel } from "../../../models/Vessel";
import { initDatabase } from "../../../db/Database";

export class SQLiteVesselRepository
	implements IRepository<Vessel> {
	async getAll(): Promise<Vessel[]> {
		const db = await initDatabase();

		const result = await db.query(`
	  SELECT *
	  FROM vessels
	  WHERE deleted_at IS NULL
	  ORDER BY created_at DESC
	`);

		return (result.values ?? []).map(
			this.mapVessel
		);
	}

	async find(id: string): Promise<Vessel | null> {
		const db = await initDatabase();

		const result = await db.query(
			`
	  SELECT *
	  FROM vessels
	  WHERE id = ?
	  LIMIT 1
	`,
			[id]
		);

		if (!result.values?.length) {
			return null;
		}

		return this.mapVessel(result.values[0]);
	}

	create(): Promise<Vessel> {
		const vessel: Vessel = {
			id: crypto.randomUUID(),
			name: "",
			type: "",
			volumeLiters: 0,
			nfcTagId: null,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			syncStatus: "local"
		};

		return Promise.resolve(vessel);
	}

	async save(vessel: Vessel): Promise<Vessel> {
		const db = await initDatabase();

		await db.run(
			`
	  INSERT INTO vessels (
		id,
		name,
		type,
		volume_liters,
		nfc_tag_id,
		created_at,
		updated_at,
		sync_status
	  )
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?)

	  ON CONFLICT(id)
	  DO UPDATE SET
		name = excluded.name,
		type = excluded.type,
		volume_liters = excluded.volume_liters,
		nfc_tag_id = excluded.nfc_tag_id,
		created_at = excluded.created_at,
		updated_at = excluded.updated_at,
		sync_status = excluded.sync_status
	  `,
			[
				vessel.id,
				vessel.name,
				vessel.type,
				vessel.volumeLiters,
				vessel.nfcTagId,
				vessel.createdAt,
				vessel.updatedAt,
				vessel.syncStatus
			]
		);

		return vessel;
	}

	async delete(id: string): Promise<void> {
		const db = await initDatabase();

		await db.run(
			`
	  UPDATE vessels
	  SET deleted_at = ?
	  WHERE id = ?
	  `,
			[new Date().toISOString(), id]
		);
	}

	private mapVessel(row: any): Vessel {
		return {
			id: row.id,
			name: row.name,
			createdAt: row.created_at,
			updatedAt: row.updated_at,
			deletedAt: row.deleted_at,
			type: row.type,
			volumeLiters: row.volume_liters,
			nfcTagId: row.nfc_tag_id,
			syncStatus: row.sync_status
		};
	}
}