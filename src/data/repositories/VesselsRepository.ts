// import { initDatabase, saveDatabaseToStore } from "../../db/Database";
// import { type Vessel } from "../../models/Vessel";
// import type { VesselRow } from "../../models/VesselRow";

// function mapRow(row: VesselRow): Vessel {
// 	return {
// 		id: row.id,
// 		name: row.name,
// 		type: row.type,
// 		volumeLiters: row.volume_liters,
// 		nfcTagId: row.nfc_tag_id,
// 		createdAt: row.created_at,
// 		updatedAt: row.updated_at,
// 		deletedAt: row.deleted_at,
// 		syncStatus: row.sync_status,
// 	};
// }

// export async function getVessels(): Promise<Vessel[]> {
// 	const db = await initDatabase();

// 	const result = await db.query(`
// 		SELECT *
// 		FROM vessels
// 		WHERE deleted_at IS NULL
// 		ORDER BY created_at DESC;
// 	`);

// 	return (result.values ?? []).map((row) => mapRow(row as VesselRow));
// }

// export async function createVessel(input: {
// 	name: string;
// 	type: string;
// 	volumeLiters: number;
// }): Promise<Vessel> {
// 	const db = await initDatabase();

// 	const now = new Date().toISOString();

// 	const vessel: Vessel = {
// 		id: crypto.randomUUID(),
// 		name: input.name,
// 		type: input.type,
// 		volumeLiters: input.volumeLiters,
// 		createdAt: now,
// 		updatedAt: now,
// 		syncStatus: "pending",
// 	};

// 	await db.run(
// 		`
// 			INSERT INTO vessels (
// 				id,
// 				name,
// 				type,
// 				volume_liters,
// 				nfc_tag_id,
// 				created_at,
// 				updated_at,
// 				deleted_at,
// 				sync_status
// 			)
// 			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
// 		`,
// 		[
// 			vessel.id,
// 			vessel.name,
// 			vessel.type,
// 			vessel.volumeLiters,
// 			vessel.nfcTagId ?? null,
// 			vessel.createdAt,
// 			vessel.updatedAt,
// 			vessel.deletedAt ?? null,
// 			vessel.syncStatus,
// 		]
// 	);

// 	await saveDatabaseToStore();

// 	return vessel;
// }