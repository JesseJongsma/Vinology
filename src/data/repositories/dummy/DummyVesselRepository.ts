import { type IRepository } from "../IRepository";
import { type Vessel } from "../../../models/Vessel";

export class DummyVesselRepository
	implements IRepository<Vessel> {

	private vessels: Vessel[] = [];

	async getAll(): Promise<Vessel[]> {
		return [...this.vessels];
	}

	async find(id: string): Promise<Vessel | null> {
		return this.vessels.find((v) => v.id === id) ?? null;
	}

	create(): Promise<Vessel> {
		const vessel: Vessel = {
			id: crypto.randomUUID(),
			name: "",
			type: "",
			volumeLiters: 0,
			nfcTagId: null,
			createdAt: new Date().toISOString(),
			updatedAt: null,
			syncStatus: "local"
		};
		this.vessels.push(vessel);
		return Promise.resolve(vessel);
	}

	async save(vessel: Vessel): Promise<Vessel> {
		const index = this.vessels.findIndex(
			(v) => v.id === vessel.id
		);

		if (index >= 0) {
			this.vessels[index] = vessel;
		} else {
			this.vessels.push(vessel);
		}

		return vessel;
	}

	async delete(id: string): Promise<void> {
		this.vessels = this.vessels.filter(
			(vessel) => vessel.id !== id
		);
	}
}