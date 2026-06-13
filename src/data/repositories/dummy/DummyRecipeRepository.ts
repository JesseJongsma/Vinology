import { type IRepository } from "../IRepository";
import { type Recipe } from "../../../models/Recipe";

export class DummyRecipeRepository
	implements IRepository<Recipe> {

	private recipes: Recipe[] = [];

	async getAll(): Promise<Recipe[]> {
		return [...this.recipes];
	}

	async find(id: string): Promise<Recipe | null> {
		return this.recipes.find((r) => r.id === id) ?? null;
	}

	create(): Promise<Recipe> {
		const recipe: Recipe = {
			id: crypto.randomUUID(),
			name: "",
			type: "",
			description: null,
			estimatedDays: null,
			targetAbv: null,
			isPublic: false,
			createdAt: new Date().toISOString(),
			syncStatus: "local"
		};

		this.recipes.push(recipe);
		return Promise.resolve(recipe);
	}

	async save(recipe: Recipe): Promise<Recipe> {
		const index = this.recipes.findIndex(
			(r) => r.id === recipe.id
		);

		if (index >= 0) {
			this.recipes[index] = recipe;
		} else {
			this.recipes.push(recipe);
		}

		return recipe;
	}

	async delete(id: string): Promise<void> {
		this.recipes = this.recipes.filter(
			(recipe) => recipe.id !== id
		);
	}
}