import {
	CapacitorSQLite,
	SQLiteConnection,
	SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";

const DB_NAME = "vinology";

let sqlite: SQLiteConnection | null = null;
let db: SQLiteDBConnection | null = null;

export async function initDatabase() {
	if (db) return db;

	sqlite = new SQLiteConnection(CapacitorSQLite);

	if (Capacitor.getPlatform() === "web") {
		await customElements.whenDefined("jeep-sqlite");

		const jeepSqliteEl = document.querySelector("jeep-sqlite");
		if (!jeepSqliteEl) {
			const el = document.createElement("jeep-sqlite");
			document.body.appendChild(el);
		}

		await sqlite.initWebStore();
	}

	db = await sqlite.createConnection(
		DB_NAME,
		false,
		"no-encryption",
		1,
		false
	);

	await db.open();

	await db.execute(`
		CREATE TABLE IF NOT EXISTS vessels (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			type TEXT NOT NULL,
			volume_liters REAL NOT NULL,
			nfc_tag_id TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			deleted_at TEXT,
			sync_status TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS recipes (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			type TEXT NOT NULL,
			description TEXT,
			estimated_days INTEGER,
			target_abv REAL,
			is_public INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			deleted_at TEXT,
			sync_status TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS batches (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			recipe_id TEXT,
			vessel_id TEXT,
			status TEXT NOT NULL,
			started_at TEXT NOT NULL,
			estimated_days INTEGER NOT NULL,
			current_day INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			deleted_at TEXT,
			sync_status TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS tasks (
			id TEXT PRIMARY KEY NOT NULL,
			title TEXT NOT NULL,
			batch_id TEXT,
			due_date TEXT NOT NULL,
			completed_at TEXT,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			deleted_at TEXT,
			sync_status TEXT NOT NULL
		);
	`);

	return db;
}

export async function saveDatabaseToStore() {
	if (Capacitor.getPlatform() === "web" && sqlite) {
		await sqlite.saveToStore(DB_NAME);
	}
}