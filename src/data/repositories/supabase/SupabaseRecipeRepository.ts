import { type Recipe } from "../../../models/Recipe";

export class SupabaseRecipeRepository {
	async getAll(): Promise<Recipe[]> {
		return Promise.resolve([]);
	}

	async find(id: string): Promise<Recipe | null> {
		return Promise.resolve(null);
	}

	async create(): Promise<Recipe> {
		const recipe: Recipe = {
			id: crypto.randomUUID(),
			name: "",
			description: "",
			type: "",
			estimatedDays: null,
			targetAbv: null,
			isPublic: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			syncStatus: "local",
		};
		return Promise.resolve(recipe);
	}

	async save(recipe: Recipe): Promise<Recipe> {
		return Promise.resolve(recipe);
	}

	async delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}