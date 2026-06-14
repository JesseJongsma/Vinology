import { type Batch } from "../../../models/Batch";

export class SupabaseBatchRepository {
	async getAll(): Promise<Batch[]> {
		return Promise.resolve([]);
	}

	async find(id: string): Promise<Batch | null> {
		return Promise.resolve(null);
	}

	async create(): Promise<Batch> {
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
		return Promise.resolve(batch);
	}

	async delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}