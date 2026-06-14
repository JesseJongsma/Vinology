import { type IRepository } from "../IRepository";
import { type Batch } from "../../../models/Batch";

export class DummyBatchRepository
	implements IRepository<Batch> {

	private batches: Batch[] = [];

	async getAll(): Promise<Batch[]> {
		return [...this.batches];
	}

	async find(id: string): Promise<Batch | null> {
		return this.batches.find((b) => b.id === id) ?? null;
	}

	create(): Promise<Batch> {
		const batch: Batch = {
			id: crypto.randomUUID(),
			name: "",
			recipeId: null,
			vesselId: null,
			status: "",
			startedAt: new Date().toISOString(),
			estimatedDays: 0,
			currentDay: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			syncStatus: "local"
		};
		this.batches.push(batch);
		return Promise.resolve(batch);
	}

	async save(batch: Batch): Promise<Batch> {
		const index = this.batches.findIndex(
			(b) => b.id === batch.id
		);

		if (index >= 0) {
			this.batches[index] = batch;
		} else {
			this.batches.push(batch);
		}

		return batch;
	}

	async delete(id: string): Promise<void> {
		this.batches = this.batches.filter(
			(batch) => batch.id !== id
		);
	}
}