import { type Vessel } from "../../../models/Vessel";

export class SupabaseVesselRepository {
	async getAll(): Promise<Vessel[]> {
		return Promise.resolve([]);
	}

	async find(id: string): Promise<Vessel | null> {
		return Promise.resolve(null);
	}

	async create(): Promise<Vessel> {
		const vessel: Vessel = {
			id: crypto.randomUUID(),
			name: "",
			type: "",
			volumeLiters: 0,
			nfcTagId: null,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			syncStatus: "local",
		};
		return Promise.resolve(vessel);
	}

	async save(vessel: Vessel): Promise<Vessel> {
		return Promise.resolve(vessel);
	}

	async delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}